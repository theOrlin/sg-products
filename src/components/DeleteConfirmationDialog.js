import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';

const DeleteConfirmationDialog = ({
  open,
  onClose,
  deleteProduct,
  productId,
}) => {
  const handleDelete = () => {
    deleteProduct(productId);
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
