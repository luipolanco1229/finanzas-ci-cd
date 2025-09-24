import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatCard from '../../src/components/MovimientosTable';

describe('StatCard', () => {
  test('renderiza el título y el monto', () => {
    render(<StatCard title="Ingresos" amount={500} />);
    expect(screen.getByText('Ingresos')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  test('muestra el trend positivo con clase trend-up', () => {
    render(<StatCard title="Ingresos" amount={500} trend="+10%" />);
    const trend = screen.getByText('+10%');
    expect(trend).toBeInTheDocument();
    expect(trend).toHaveClass('trend-up');
  });

  test('muestra el trend negativo con clase trend-down', () => {
    render(<StatCard title="Gastos" amount={200} trend="-5%" />);
    const trend = screen.getByText('-5%');
    expect(trend).toBeInTheDocument();
    expect(trend).toHaveClass('trend-down');
  });

  test('no muestra trend si no se pasa prop trend', () => {
    render(<StatCard title="Saldo" amount={1000} />);
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
  });

  test('aplica el estilo marginTop al trend', () => {
    render(<StatCard title="Ingresos" amount={500} trend="+10%" />);
    const trend = screen.getByText('+10%');
    expect(trend).toHaveStyle({ marginTop: '6px' });
  });
});