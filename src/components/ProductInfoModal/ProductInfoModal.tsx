import { Box, Modal, Typography } from '@mui/material';
import { Product } from '@services/productServiceTypes';
import { modalStyles } from './ProductInfoModalStyles';

export interface ProductInfoModalProps {
  product: Product;
  showModal: (show: boolean) => void;
}

const ProductInfoModal = ({ product, showModal }: ProductInfoModalProps) => {
  const { id, name, year, color, pantone_value } = product;

  return (
    <Modal
      open={true}
      onClose={() => showModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <span>{name.toUpperCase()} ALL DATA</span>
        </Typography>
        <Typography
          component={'div'}
          id="modal-modal-description"
          sx={{ mt: 2 }}
        >
          <div
            className="wrapper"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <span>ID: {id}</span>
            <span>Name: {name}</span>
            <span>Year: {year}</span>
            <span>Color: {color}</span>
            <span>Pantone value: {pantone_value}</span>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ProductInfoModal;
