const Product = require('../models/product.model');

// GET /api/products - Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// GET /api/products/:id - Get single product
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id);
    
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product
    });
  } catch (error) {
    console.error("Error in fetching product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// POST /api/products - Create a product
exports.createProducts = async (req, res) => {
  const product = req.body; // user will send this data
  
  if (!product.title || !product.image || !product.description || !product.price) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields"
    });
  }
  
  const newProduct = new Product(product);
  
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// PUT /api/products/:id - Update a product
exports.updateProducts = async (req, res) => {
  const { id } = req.params;
  
  const product = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product Id"
    });
  }
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// DELETE /api/products/:id - Delete a product
exports.deleteProducts = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted"
    });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }
};