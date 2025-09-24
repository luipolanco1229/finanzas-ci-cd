import { describe, test, expect, vi } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovimientosTable from '../../src/components/MovimientosTable';

describe('MovimientosTable', () => {
  test('renderiza cabecera y filas según movimientos', () => {
    const movs = [
      { tipo: 'ingreso', monto: 100, descripcion: 'Salario',   categoria: 'Trabajo'   },
      { tipo: 'gasto',   monto: 50,  descripcion: 'Transporte', categoria: 'Movilidad' },
    ];
    render(<MovimientosTable movimientos={movs} onDelete={() => {}} />);

    const table = screen.getByRole('table');
    // 1 fila de header + 2 filas de body
    const rows = within(table).getAllByRole('row');
    expect(rows).toHaveLength(3);

    // verifica algunas celdas visibles
    expect(screen.getByText('ingreso')).toBeInTheDocument();
    expect(screen.getByText('gasto')).toBeInTheDocument();
    expect(screen.getByText('Salario')).toBeInTheDocument();
    expect(screen.getByText('Transporte')).toBeInTheDocument();
  });

  test('al hacer click en "Eliminar" llama onDelete con el índice', () => {
    const movs = [
      { tipo: 'ingreso', monto: 100, descripcion: 'Salario', categoria: 'Trabajo' },
      { tipo: 'gasto',   monto: 50,  descripcion: 'Transporte', categoria: 'Movilidad' },
    ];
    const onDelete = vi.fn();

    render(<MovimientosTable movimientos={movs} onDelete={onDelete} />);

    const table = screen.getByRole('table');
    const deleteButtons = within(table).getAllByRole('button', { name: /eliminar/i });

    // El primer botón elimina el índice 0
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(0);

    // El segundo botón elimina el índice 1
    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test('muestra el mensaje vacío cuando no hay movimientos', () => {
    render(<MovimientosTable movimientos={[]} onDelete={() => {}} />);

    // no hay filas de datos (solo header + fila de mensaje)
    const table = screen.getByRole('table');
    expect(screen.getByText(/Sin movimientos todavía/i)).toBeInTheDocument();

    // sigue existiendo la tabla y su header
    const rows = within(table).getAllByRole('row');
    expect(rows.length).toBeGreaterThanOrEqual(2);
  });

  test('cuando disabled=true los botones "Eliminar" están deshabilitados', () => {
    const movs = [
      { tipo: 'ingreso', monto: 100, descripcion: 'Salario', categoria: 'Trabajo' },
      { tipo: 'gasto',   monto: 50,  descripcion: 'Transporte', categoria: 'Movilidad' },
    ];
    const onDelete = vi.fn();

    render(<MovimientosTable movimientos={movs} onDelete={onDelete} disabled />);

    const table = screen.getByRole('table');
    const deleteButtons = within(table).getAllByRole('button', { name: /eliminar/i });
    expect(deleteButtons[0]).toBeDisabled();
    expect(deleteButtons[1]).toBeDisabled();

    // aunque hagamos click no debería llamar al handler
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).not.toHaveBeenCalled();
  });
});
