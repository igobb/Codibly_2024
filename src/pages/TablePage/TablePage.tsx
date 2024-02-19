import React, { Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { Loader } from '@components/Loader';
import './TablePage.scss';
import { ProductInfoModal } from '@components/ProductInfoModal';
import { SearchByIdInput } from '@components/SearchByIdInput';
import { ErrorView } from '@components/ErrorView';
import { useTablePageContext } from '@context/TablePageContext';

const TablePage: React.FC = () => {
  const {
    loading,
    error,
    debouncedId,
    products,
    total,
    page,
    handleOpenModal,
    handleChangePage,
  } = useTablePageContext();

  return (
    <div className="wrapper">
      <SearchByIdInput />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorView error={error} filterId={debouncedId ? debouncedId : ''} />
      ) : (
        <Fragment>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Year</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow
                    hover
                    key={product.id}
                    sx={{
                      backgroundColor: `${product?.color}`,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpenModal(product)}
                  >
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {debouncedId ? null : (
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={total}
              rowsPerPage={5}
              page={page - 1}
              onPageChange={handleChangePage}
              className="input"
            />
          )}
        </Fragment>
      )}

      <ProductInfoModal />
    </div>
  );
};

export default TablePage;
