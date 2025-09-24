import { render, screen } from '@testing-library/react';
import App from '../../src/app/App';

// Mock ResizeObserver para evitar error en JSDOM
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('muestra el dashboard principal', async () => {
  render(<App />);
  expect(await screen.findByText(/Recent Transactions/i)).toBeInTheDocument();
});
