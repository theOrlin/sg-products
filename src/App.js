import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';

import PERMISSIONS from './constants';
import ProductContext from './context/products-context';
import getPermissions from './rest/getPermissions';
import fetchProducts from './rest/fetchProducts';
import AddProductForm from './components/AddProductForm';
import ProductsTable from './components/ProductsTable';

function App() {
  const [products, setProducts] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const contextValues = { products, setProducts };

  useEffect(() => {
    fetchProducts().then((fetchedProducts) => setProducts(fetchedProducts));
    getPermissions().then((fetchedPermissions) =>
      setPermissions(fetchedPermissions)
    );
  }, []);

  return (
    <ProductContext.Provider value={contextValues}>
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <header>
              <Typography variant="h2" color="primary" sx={{ my: 4 }}>
                Products Manager
              </Typography>
            </header>
            {permissions.includes(PERMISSIONS.CREATE) && <AddProductForm />}
            {permissions.includes(PERMISSIONS.READ) && (
              <div>
                {products.length > 0 ? (
                  <ProductsTable
                    allowDelete={permissions.includes(PERMISSIONS.DELETE)}
                    allowEdit={permissions.includes(PERMISSIONS.UPDATE)}
                  />
                ) : (
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{ mt: 3 }}
                  >
                    No products found.
                  </Typography>
                )}
              </div>
            )}
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
    </ProductContext.Provider>
  );
}

export default App;
