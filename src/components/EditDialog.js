import { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import ProductContext from '../context/products-context';
import editProduct from '../rest/editProduct';

const EditDialog = ({ open, onClose, product }) => {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productCurrency, setProductCurrency] = useState(product.currency);
  const { products, setProducts } = useContext(ProductContext);

  useEffect(() => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductCurrency(product.currency);
  }, [product]);

  const handleSave = () => {
    editProduct(product.id, {
      name: productName,
      price: productPrice,
      currency: productCurrency,
    }).then((editedData) => {
      const editedProductIndex = products.findIndex(
        (product) => product.id === editedData.id
      );
      const newProducts = products.slice();
      newProducts[editedProductIndex] = editedData;
      setProducts(newProducts);
    });

    onClose();
  };

  const handleCancel = () => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductCurrency(product.currency);

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle color="primary">Edit Product</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <TextField
          color="secondary"
          label="Product name"
          onChange={(e) => setProductName(e.target.value)}
          value={productName || ''}
          size="small"
          sx={{ mb: 2, mt: 1 }}
          fullWidth
        ></TextField>
        <TextField
          color="secondary"
          type="number"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          label="Price"
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice || ''}
          size="small"
          sx={{ mb: 2 }}
          fullWidth
        ></TextField>
        <TextField
          color="secondary"
          label="Currency"
          onChange={(e) => setProductCurrency(e.target.value)}
          value={productCurrency || ''}
          size="small"
          sx={{ mb: 2 }}
          fullWidth
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<CheckIcon />}
          onClick={handleSave}
          disabled={!productName || !productPrice || !productCurrency}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
