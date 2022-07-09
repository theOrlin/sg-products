import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';
import AddProductForm from './components/AddProductForm';
import ProductsTable from './components/ProductsTable';
import PERMISSIONS from './constants';

function App() {
  const [products, setProducts] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchProducts();
    getPermissions();
  }, []);

  const getPermissions = () => {
    axios
      .get('/permissions')
      .then(({ data }) => {
        setPermissions([...data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProducts = () => {
    axios
      .get('/products')
      .then(({ data }) => {
        setProducts([...data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addProduct = async (product) => {
    await axios
      .post('/products', product)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`/products/${productId}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editProduct = (productId, product) => {
    axios
      .put(`/products/${productId}`, product)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <header>
            <Typography variant="h2" color="primary" sx={{ my: 4 }}>
              Products
            </Typography>
          </header>
          {permissions.includes(PERMISSIONS.CREATE) && (
            <AddProductForm addProduct={addProduct} />
          )}
          {permissions.includes(PERMISSIONS.READ) && (
            <div>
              {products.length > 0 ? (
                <ProductsTable
                  products={products}
                  deleteProduct={deleteProduct}
                  allowDelete={permissions.includes(PERMISSIONS.DELETE)}
                  allowEdit={permissions.includes(PERMISSIONS.UPDATE)}
                  editProduct={editProduct}
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
  );
}

export default App;
