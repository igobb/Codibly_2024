import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Loader } from '@components/Loader';

describe('Loader component', () => {
  test('renders rotating lines loader', () => {
    render(<Loader />);

    const rotatingLinesLoader = screen.getByTestId('rotating-lines-svg');

    expect(rotatingLinesLoader).toBeInTheDocument();
  });
});
