const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Import Routes
const authRoutes = require("./routes/auth.route.js") // Add this line

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // If you need to handle cookies or authorization headers
  }),
)
app.use(express.json())

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log(`Attempting to connect to MongoDB with URI: ${process.env.MONGO_URI}`) // New Log
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `MongoDB Connected: Host: ${conn.connection.host}, Port: ${conn.connection.port}, DB Name: ${conn.connection.name}`,
    ) // Updated Log
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`) // Updated Log
    console.error(`Full error:`, error) // New Log
    process.exit(1)
  }
}

// Product Schema and Model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Explicitly use "MernStack" collection
const Product = mongoose.model("Product", productSchema, "MernStack")

// Routes

// Auth routes - Add this line
app.use("/api/auth", authRoutes)

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Product Manager API is running!",
    endpoints: {
      "GET /api/products": "Get all products",
      "POST /api/products": "Create a product",
      "GET /api/products/:id": "Get single product",
      "PUT /api/products/:id": "Update a product",
      "DELETE /api/products/:id": "Delete a product",
      "POST /api/auth/register": "Register a new user",
      "POST /api/auth/login": "Login user",
    },
  })
})

// GET /api/products - Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message })
  }
})

// GET /api/products/:id - Get one product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message })
  }
})

// POST /api/products - Add a product
app.post("/api/products", async (req, res) => {
  console.log("POST /api/products hit") // New log
  console.log("Request body:", req.body) // New log

  try {
    const { title, image, description, price } = req.body

    // Basic validation
    if (!title || !image || !description || !price) {
      console.log("Validation failed: All fields are required") // New log
      return res.status(400).json({ message: "All fields are required" })
    }

    if (Number.isNaN(Number.parseFloat(price)) || Number.parseFloat(price) <= 0) {
      // Improved price validation
      console.log("Validation failed: Price must be a positive number") // New log
      return res.status(400).json({ message: "Price must be a positive number" })
    }

    const newProduct = new Product({
      title,
      image,
      description,
      price: Number.parseFloat(price),
    })

    console.log("Attempting to save product:", newProduct) // New log
    await newProduct.save()
    console.log("Product saved successfully:", newProduct) // New log

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    })
  } catch (error) {
    console.error("Error in POST /api/products:", error) // More detailed error log
    res.status(500).json({ message: "Failed to create product", error: error.message, stack: error.stack }) // Include stack in dev
  }
})

// PUT /api/products/:id - Update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { title, image, description, price } = req.body

    // Basic validation
    if (!title || !image || !description || !price) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" })
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, image, description, price: Number.parseFloat(price) },
      { new: true },
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message })
  }
})

// DELETE /api/products/:id - Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Start server and connect to database
app.listen(PORT, () => {
  connectDB()
  console.log(`Server started at http://localhost:${PORT}`)
})