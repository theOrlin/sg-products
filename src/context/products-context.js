import React from 'react';

const ProductsContext = React.createContext({
  products: [],
  setProducts: () => {},
});

export default ProductsContext;
