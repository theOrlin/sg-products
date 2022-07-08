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

const ProductsTable = ({
  products,
  deleteProduct,
  allowDelete,
  allowEdit,
  editProduct,
}) => {
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const editCurrentProduct = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            onClick={() => deleteProduct(product.id)}
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
        open={open}
        onClose={handleClose}
        product={currentProduct}
        editProduct={editProduct}
      />
    </>
  );
};

export default ProductsTable;
