import { useContext } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';

import ProductContext from '../context/products-context';
import deleteProduct from '../rest/deleteProduct';

const DeleteConfirmationDialog = ({ open, onClose, productId }) => {
  const { products, setProducts } = useContext(ProductContext);

  const handleDelete = () => {
    deleteProduct(productId).then(() =>
      setProducts(products.filter((product) => product.id !== productId))
    );
    onClose();
  };

  return (
    <Dialog open={open} maxWidth={false} onClose={onClose}>
      <DialogTitle color="primary">Really Delete?</DialogTitle>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteForeverIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
