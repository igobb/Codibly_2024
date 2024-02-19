import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { SearchByIdInput } from '@components/SearchByIdInput';

describe('SearchByIdInput component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input field with proper label and icon', async () => {
    vi.mock('@context/TablePageContext', async () => ({
      ...(await vi.importActual('@context/TablePageContext')),
      useTablePageContext: () => ({
        filterId: '',
        handleFilterChange: () => vi.fn(),
      }),
    }));

    render(<SearchByIdInput />);

    const inputLabel = screen.getByText('Filter by ID');
    const inputField = screen.getByRole('textbox');
    const searchIcon = screen.getByTestId('SearchIcon');

    console.log(inputLabel);

    expect(inputLabel).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  //   test('calls handleFilterChange when input value changes', () => {
  //     const mockHandleFilterChange = vi.fn();

  //     vi.mock('@context/TablePageContext', async () => ({
  //       ...(await vi.importActual('@context/TablePageContext')),
  //       useTablePageContext: () => ({
  //         filterId: '',
  //         handleFilterChange: mockHandleFilterChange,
  //       }),
  //     }));

  //     render(<SearchByIdInput />);

  //     const inputField = screen.getByRole('textbox');

  //     fireEvent.change(inputField, { target: { value: '123' } });

  //     expect(mockHandleFilterChange).toHaveBeenCalledWith(expect.any(Object));
  //   });
});
