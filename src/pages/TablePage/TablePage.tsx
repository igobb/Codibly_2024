import React, { useEffect, useState } from 'react';
import ProductService, { Product } from '@services/ProductService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from '@mui/material';
import { Loader } from '@components/Loader';
import './TablePage.scss';

export const TablePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(10);
  const [filterId, setFilterId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const idParam = urlParams.get('id');

    setPage(pageParam ? parseInt(pageParam, 10) - 1 : 0);
    setFilterId(idParam || '');
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, perPage, filterId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      let response;
      if (filterId) {
        // response = await ProductService.getProductById(Number(filterId));
        // setProducts([response]);
      } else {
        response = await ProductService.getProducts(page + 1, perPage);
        setProducts(response.data);
        setTotal(response.total);
        updateUrlParams(page + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUrlParams = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(newPage));
    window.history.replaceState({}, '', url.toString());
  };

  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   if (/^\d*$/.test(value)) {
  //     setFilterId(value);
  //     const url = new URL(window.location.href);
  //     url.searchParams.set('id', value);
  //     setPage(0);
  //     window.history.replaceState({}, '', url.toString());
  //   }
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    updateUrlParams(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
    updateUrlParams(1);
  };

  return (
    <div className="wrapper">
      {/* <TextField
        type="text"
        placeholder="Filter by ID"
        value={filterId}
        onChange={handleFilterChange}
        className="input"
      /> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  style={{ backgroundColor: product.color }}
                >
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.year}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
