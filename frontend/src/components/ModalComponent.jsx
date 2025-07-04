import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const ModalComponent = ({ 
  show, 
  onClose, 
  onSubmit, 
  title, 
  submitLabel, 
  loading, 
  children 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              {submitLabel}
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;