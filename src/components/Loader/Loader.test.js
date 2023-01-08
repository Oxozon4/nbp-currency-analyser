import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('shows loader', () => {
  render(<Loader isLoading={true} />);
  const loaderElement = screen.getByTestId('loader-element');
  expect(loaderElement).toBeInTheDocument();
});

test('does not show loader', () => {
  render(<Loader isLoading={false} />);
  const loaderElement = screen.queryByTestId('loader-element');
  expect(loaderElement).toBeNull();
});
