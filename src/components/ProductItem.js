import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p><strong>Бренд:</strong> {product.brand}</p>
      <p><strong>Категория:</strong> {product.category}</p>
      <p><strong>Цена:</strong> ${product.price}</p>
      <p><strong>Цвет:</strong> {product.color}</p>
    </div>
  );
};

export default ProductItem;
