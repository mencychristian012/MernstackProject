import React from "react";
import { Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({ product, onEdit, onDelete, deleteLoading }) => {
  return (
    <Card className="h-100 position-relative">
      <Card.Img 
        variant="top" 
        src={product.image} 
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong className="text-primary">${product.price}</strong>
          <div className="d-flex gap-2">
            <FaEdit 
              role="button" 
              className="text-success" 
              title="Edit"
              onClick={() => onEdit(product)}
              style={{ cursor: "pointer", fontSize: "16px" }}
            />
            <FaTrash 
              role="button" 
              className="text-danger" 
              title="Delete"
              onClick={() => onDelete(product)}
              style={{ 
                cursor: "pointer", 
                fontSize: "16px",
                opacity: deleteLoading ? 0.5 : 1,
                pointerEvents: deleteLoading ? "none" : "auto"
              }}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;