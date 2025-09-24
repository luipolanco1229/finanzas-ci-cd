// tests/components/Sidebar.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../../../src/components/Sidebar';

describe('Sidebar', () => {
  test('renderiza marca y enlaces', () => {
    render(<Sidebar />);

    // Marca
    expect(screen.getByText(/Finans/i)).toBeInTheDocument();

    // Botones por rol + nombre accesible
    expect(screen.getByRole('button', { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Budgets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Expenses/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Investments/i })).toBeInTheDocument();

    // Opcional: aseguramos que hay exactamente 4 botones de navegación
    const navButtons = screen.getAllByRole('button', { name: /(Overview|Budgets|Expenses|Investments)/i });
    expect(navButtons).toHaveLength(4);
  });
});
