import ProductService from '@services/ProductService';
import { Product } from '@services/productServiceTypes';
import { AxiosError } from 'axios';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const useTablePageState = () => {
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

  const [debouncedId] = useDebounce(filterId, 300);

  const maxPages = Math.ceil(total / 5);

  if (page > maxPages) {
    setPage(1);
  }

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    let response;

    if (debouncedId && debouncedId !== '') {
      response = await ProductService.getProductById(Number(debouncedId));

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
  }, [page, debouncedId]);

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

  return {
    filterId,
    loading,
    error,
    debouncedId,
    products,
    selectedProduct,
    total,
    page,
    handleOpenModal,
    handleChangePage,
    handleFilterChange,
    showModal,
    setShowModal,
  };
};

type TablePageState = ReturnType<typeof useTablePageState>;

export const TablePageContext = createContext<TablePageState | null>(null);

interface TablePageProviderProps {
  children: ReactNode;
}

export const TablePageProvider: FC<TablePageProviderProps> = ({ children }) => {
  const value = useTablePageState();

  return (
    <TablePageContext.Provider value={value}>
      {children}
    </TablePageContext.Provider>
  );
};

export const useTablePageContext = () => {
  const tablePage = useContext(TablePageContext);

  if (!tablePage) {
    throw new Error(
      'useTablePageContext must be used inside TablePageProvider',
    );
  }

  return tablePage;
};
