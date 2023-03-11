import { useState, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ProductContext from '../context/products-context';
import addProduct from '../rest/addProduct';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCurrency, setProductCurrency] = useState('');
  const { products, setProducts } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name: productName,
      price: productPrice,
      currency: productCurrency,
    }).then((newProduct) => setProducts([...products, newProduct]));
    setProductName('');
    setProductPrice('');
    setProductCurrency('');
  };

  const isEnabled =
    productName.length > 0 &&
    productPrice.length > 0 &&
    productCurrency.length > 0;

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        color="secondary"
        label="Product name"
        onChange={(e) => setProductName(e.target.value)}
        value={productName}
        size="small"
      ></TextField>
      <TextField
        color="secondary"
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        label="Price"
        onChange={(e) => setProductPrice(e.target.value)}
        value={productPrice}
        size="small"
      ></TextField>
      <TextField
        color="secondary"
        label="Currency"
        onChange={(e) => setProductCurrency(e.target.value)}
        value={productCurrency}
        size="small"
      ></TextField>
      <Button
        startIcon={<AddIcon />}
        type="submit"
        disabled={!isEnabled}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Add Product
      </Button>
    </Box>
  );
};

export default AddProductForm;
