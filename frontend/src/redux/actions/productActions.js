import { toast } from "react-toastify"

// Action Types
// Fetch Products
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST"
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS"
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE"

// Create Product
export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST"
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS"
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE"

// Update Product
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST"
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS"
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE"

// Delete Product
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST"
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS"
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE"

// Action Creators

// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST })
  try {
    const res = await fetch("https://mernstackproject-1-rd07.onrender.com/api/products")
    const data = await res.json()

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message })
    toast.error("Failed to fetch products")
  }
}

// Create product
export const addProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST })
  try {
    const res = await fetch("https://mernstackproject-1-rd07.onrender.com/api/products", {
      // Changed from 5001 to 5000
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    const data = await res.json()

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
    toast.success("Product created successfully!")
    dispatch(fetchProducts())
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message })
    toast.error("Failed to create product")
  }
}

// Update product
export const updateProduct = (_id, product) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST })
  try {
    const res = await fetch(`https://mernstackproject-1-rd07.onrender.com/api/products/${_id}`, {
      // Changed from 5001 to 5000
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    const data = await res.json()

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
    toast.success("Product updated successfully!")
    dispatch(fetchProducts())
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message })
    toast.error("Failed to update product")
  }
}

// Delete product
export const deleteProduct = (_id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST })
  try {
    await fetch(`https://mernstackproject-1-rd07.onrender.com/api/products/${_id}`, {
      // Changed from 5001 to 5000
      method: "DELETE",
    })

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: _id })
    toast.success("Product deleted successfully!")
    dispatch(fetchProducts())
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message })
    toast.error("Failed to delete product")
  }
}
