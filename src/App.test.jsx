import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing shell', () => {
  it('renders dashboard by default route', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/aquaai conservation system/i)).toBeInTheDocument();
    expect(screen.getByText(/smart dashboard/i)).toBeInTheDocument();
  });

  it('renders economy route', () => {
    render(
      <MemoryRouter initialEntries={['/economy']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/water credit marketplace/i)).toBeInTheDocument();
  });
});
