import { Box, Modal, Stack, Typography } from '@mui/material';
import { Product } from '@services/productServiceTypes';
import { modalStyles } from './ProductInfoModalStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useTablePageContext } from '@context/TablePageContext';

export interface ProductInfoModalProps {
  product: Product;
  showModal: (show: boolean) => void;
}

const ProductInfoModal = () => {
  const { showModal, setShowModal, selectedProduct } = useTablePageContext();

  console.log(selectedProduct);

  if (!showModal || !selectedProduct) {
    return null;
  }

  const { id, name, year, color, pantone_value } = selectedProduct;

  return (
    <Modal
      open={true}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        <Stack direction="row" spacing={2}>
          <Stack justifyContent="center">
            <Box sx={{ width: 28, height: 28, backgroundColor: `${color}` }} />
          </Stack>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name.toUpperCase()} ALL DATA
          </Typography>
        </Stack>

        <Typography
          component={'div'}
          id="modal-modal-description"
          sx={{ mt: 2 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>ID: {id}</span>
            <span>Year: {year}</span>
            <span>Color: {color}</span>
            <span>Pantone value: {pantone_value}</span>
          </div>
        </Typography>

        <CloseIcon
          onClick={() => setShowModal(false)}
          sx={{
            position: 'absolute',
            top: 22,
            right: 30,
            cursor: 'pointer',
          }}
        />
      </Box>
    </Modal>
  );
};

export default ProductInfoModal;
