import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ErrorView } from '@components/ErrorView';
import { AxiosError } from 'axios';

describe('ErrorView component', () => {
  test('renders "An error has occurred" message when status is not 404', () => {
    const error = {
      response: {
        status: 500,
      },
    };

    const filterId = '123';

    render(<ErrorView error={error as AxiosError} filterId={filterId} />);

    const errorMessage = screen.getByText('An error has occurred');

    expect(errorMessage).toBeInTheDocument();
  });

  test('renders custom message when status is 404', () => {
    const error = {
      response: {
        status: 404,
      },
    };
    const filterId = '123';

    render(<ErrorView error={error as AxiosError} filterId={filterId} />);

    const errorMessageId = screen.getByText('123');

    const errorMessageStatus = screen.getByText('Status: 404');

    expect(errorMessageId && errorMessageStatus).toBeInTheDocument();
  });

  test('renders correct status code', () => {
    const error = {
      response: {
        status: 404,
      },
    };
    const filterId = '123';

    render(<ErrorView error={error as AxiosError} filterId={filterId} />);

    const statusMessage = screen.getByText('Status: 404');
    expect(statusMessage).toBeInTheDocument();
  });
});
