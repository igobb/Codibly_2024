import React, { Fragment, useEffect, useState } from 'react';
import ProductService from '@services/ProductService';
import { Product } from '@services/productServiceTypes';
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
import ProductInfoModal from '@components/ProductInfoModal/ProductInfoModal';
import { SearchByIdInput } from '@components/SearchByIdInput/SearchByIdInput';
import { ErrorView } from '@components/ErrorView';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';

const TablePage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlPage = searchParams.get('page');
  const urlId = searchParams.get('id');

  const [filterId, setFilterId] = useState<string | null>(urlId);
  const [page, setPage] = useState<number>(urlPage ? Number(urlPage) : 1);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(12);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<AxiosError | null>();

  const maxPages = Math.ceil(total / 5);

  if (page > maxPages) {
    setPage(1);
  }

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    let response;

    if (filterId && filterId !== '') {
      response = await ProductService.getProductById(Number(filterId));

      if (response?.name === 'AxiosError') {
        setError(response);
        setLoading(false);
        return;
      }

      setProducts([response.data]);
    } else {
      response = await ProductService.getProducts(page);

      if (response?.name === 'AxiosError') {
        setError(response);
        setLoading(false);
        return;
      }

      setProducts(response.data);
      setTotal(response.total);
      updateUrlParams(page);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, filterId]);

  const updateUrlParams = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(newPage));
    window.history.replaceState({}, '', url.toString());
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const url = new URL(window.location.href);

    if (/^\d*$/.test(value)) {
      setFilterId(value);
      url.searchParams.set('id', value);
      url.searchParams.delete('page');
    }

    window.history.replaceState({}, '', url.toString());
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
    updateUrlParams(newPage + 1);
  };

  const handleOpenModal = (product: Product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  return (
    <div className="wrapper">
      <SearchByIdInput
        filterId={filterId ? filterId : ''}
        handleFilterChange={handleFilterChange}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorView error={error} filterId={filterId ? filterId : ''} />
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
          {filterId ? null : (
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
      {showModal && selectedProduct && (
        <ProductInfoModal product={selectedProduct} showModal={setShowModal} />
      )}
    </div>
  );
};

export default TablePage;
