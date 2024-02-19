import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ProductInfoModal } from '@components/ProductInfoModal';
import { beforeEach } from 'node:test';

describe('ProductInfoModal with showModal = false', () => {
  vi.mock('@context/TablePageContext', async () => ({
    ...(await vi.importActual('@context/TablePageContext')),
    useTablePageContext: () => ({
      showModal: false,
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

  test('does not render modal when showModal is false', () => {
    render(<ProductInfoModal />);

    const modalElement = screen.queryByRole('dialog');

    expect(modalElement).not.toBeInTheDocument();
  });

  test('does not render modal when selectedProduct is null', () => {
    render(<ProductInfoModal />);

    const modalElement = screen.queryByRole('dialog');

    expect(modalElement).not.toBeInTheDocument();
  });
});
