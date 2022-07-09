import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDialog from './EditDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const ProductsTable = ({
  products,
  deleteProduct,
  allowDelete,
  allowEdit,
  editProduct,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const editCurrentProduct = (product) => {
    setCurrentProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const deleteCurrentProduct = (product) => {
    setCurrentProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const tableRows = products.map((product, idx) => (
    <TableRow key={idx}>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.currency}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {allowEdit && (
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => editCurrentProduct(product)}
            title="Edit product"
          >
            <EditIcon />
          </IconButton>
        )}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {allowDelete && (
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteCurrentProduct(product)}
            title="Delete product"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {' '}
                <Typography variant="h6" color="secondary">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="secondary">
                  Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="secondary">
                  Currency
                </Typography>
              </TableCell>
              <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                {(allowEdit || allowDelete) && (
                  <Typography variant="h6" color="secondary">
                    Actions
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
      <EditDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        product={currentProduct}
        editProduct={editProduct}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        productId={currentProduct.id}
        onClose={handleDeleteDialogClose}
        deleteProduct={deleteProduct}
      />
    </>
  );
};

export default ProductsTable;
