import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Empty from "../../components/Empty";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import ProductModal from "./ProductModal";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/actions/productActions";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, createLoading, updateLoading, deleteLoading, error } = useSelector(
    (state) => state.products
  );

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditItem(product);
    setShowModal(true);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

  const handleSubmit = (values) => {
    if (editItem) {
      dispatch(updateProduct(editItem.id, values));
    } else {
      dispatch(addProduct(values));
    }
    setShowModal(false);
  };

  if (loading) {
    return (
      <>
        <section>
          <Header />
        </section>
        <Container className="py-5">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <section>
        <Header />
      </section>
      <Container className="py-5">
        <div className="d-flex justify-content-end mb-4">
          <Button 
            variant="primary" 
            onClick={handleAdd}
            disabled={createLoading}
          >
            {createLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding...
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>Add Product
              </>
            )}
          </Button>
        </div>

        {items.length === 0 ? (
          <div 
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <Empty message="We're currently out of stock" />
          </div>
        ) : (
          <Row className="g-4">
            {items.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
                <ProductCard 
                  product={product} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  deleteLoading={deleteLoading}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
      
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        initialValues={
          editItem || {
            title: "",
            image: "",
            description: "",
            price: 0,
          }
        }
        onSubmit={handleSubmit}
        isEdit={!!editItem}
        loading={editItem ? updateLoading : createLoading}
      />
    </>
  );
};

export default Products;