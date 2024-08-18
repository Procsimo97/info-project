import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p>Нет товаров, соответствующих выбранным фильтрам.</p>
      )}
    </div>
  );
};

export default ProductList;
