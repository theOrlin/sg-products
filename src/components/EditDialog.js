import { useState, useEffect } from 'react';
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

const EditDialog = ({ open, onClose, product, editProduct }) => {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productCurrency, setProductCurrency] = useState(product.currency);

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
      <DialogContent dividers sx={{ p: 2 }}>
        <TextField
          color="secondary"
          label="Product name"
          onChange={(e) => setProductName(e.target.value)}
          value={productName || ''}
          size="small"
          sx={{ mb: 2 }}
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
