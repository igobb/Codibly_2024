import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ProductInfoModal } from '@components/ProductInfoModal';
import { beforeEach } from 'node:test';

describe('ProductInfoModal component', () => {
  vi.mock('@context/TablePageContext', async () => ({
    ...(await vi.importActual('@context/TablePageContext')),
    useTablePageContext: () => ({
      showModal: true,
      setShowModal: () => vi.fn,
      selectedProduct: {
        id: '1',
        name: 'Product Name',
        year: '2022',
        color: 'red',
        pantone_value: '1234',
      },
    }),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders modal with product information', async () => {
    render(<ProductInfoModal />);

    const productName = screen.getByText('PRODUCT NAME ALL DATA');
    const productId = screen.getByText('ID: 1');
    const productYear = screen.getByText('Year: 2022');
    const productColor = screen.getByText('Color: red');
    const productPantoneValue = screen.getByText('Pantone value: 1234');

    expect(productName).toBeInTheDocument();
    expect(productId).toBeInTheDocument();
    expect(productYear).toBeInTheDocument();
    expect(productColor).toBeInTheDocument();
    expect(productPantoneValue).toBeInTheDocument();
  });

  test('open modal with button for closing', () => {
    render(<ProductInfoModal />);

    const closeIcon = screen.getByTestId('CloseIcon');

    expect(closeIcon).toBeInTheDocument();
  });
});
