import React from "react";
import { Form } from "react-bootstrap";
import ModalComponent from "../../components/ModalComponent";
import { Formik } from "formik";
import * as Yup from "yup";

const ProductModal = ({ show, onClose, initialValues, onSubmit, isEdit, loading }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Product name is required"),
    image: Yup.string().required("Banner is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive(),
  });

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
        onClose();
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <ModalComponent
          show={show}
          onClose={onClose}
          onSubmit={handleSubmit}
          title={isEdit ? "Edit Product" : "Add New Product"}
          submitLabel={loading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update" : "Add")}
          loading={loading}
        >
          <Form noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter product name"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.title && !!errors.title}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Banner</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter banner url"
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.image && !!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Enter product description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.price && !!errors.price}
                min={0}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </ModalComponent>
      )}
    </Formik>
  );
};

export default ProductModal;