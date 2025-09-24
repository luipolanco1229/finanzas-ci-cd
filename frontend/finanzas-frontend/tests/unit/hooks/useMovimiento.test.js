import { test, expect, describe, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useMovimientos } from '../../../src/hooks/useMovimientos';
import { movimientosApi } from '../../../src/api/movimientosApi';

// Mock API
vi.mock('../../../src/api/movimientosApi', () => ({
  movimientosApi: {
    listar: vi.fn(),
    resumen: vi.fn(),
    crear: vi.fn(),
    eliminar: vi.fn(),
  }
}));

describe('useMovimientos', () => {
  const sampleMovs = [{ tipo: 'ingreso', monto: 100 }];
  const sampleResumen = { ingresos: 100, gastos: 0, balance: 100, total_movimientos: 1, gastos_por_categoria: {} };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('carga movimientos y resumen al iniciar', async () => {
    movimientosApi.listar.mockResolvedValue(sampleMovs);
    movimientosApi.resumen.mockResolvedValue(sampleResumen);

    const { result } = renderHook(() => useMovimientos());

    // espera a que cargue
    await waitFor(() => {
      expect(result.current.movimientos).toEqual(sampleMovs);
      expect(result.current.resumen.ingresos).toBe(100);
    });
  });

  test('crear válido llama API y recarga', async () => {
    movimientosApi.listar.mockResolvedValue(sampleMovs);
    movimientosApi.resumen.mockResolvedValue(sampleResumen);
    movimientosApi.crear.mockResolvedValue({});

    const { result } = renderHook(() => useMovimientos());

    await waitFor(() => expect(result.current.movimientos).toEqual(sampleMovs));

    await act(async () => {
      const res = await result.current.crear({ tipo: 'ingreso', monto: 50 });
      expect(res.ok).toBe(true);
    });

    expect(movimientosApi.crear).toHaveBeenCalledWith(
    expect.objectContaining({ tipo: 'ingreso', monto: 50 })
    );
   });

  test('crear inválido no llama API', async () => {
    const { result } = renderHook(() => useMovimientos());
    let res;
    await act(async () => {
      res = await result.current.crear({ tipo: 'x', monto: 0 });
    });
    expect(res.ok).toBe(false);
    expect(movimientosApi.crear).not.toHaveBeenCalled();
  });

  test('eliminar llama API y recarga', async () => {
    movimientosApi.listar.mockResolvedValue(sampleMovs);
    movimientosApi.resumen.mockResolvedValue(sampleResumen);
    movimientosApi.eliminar.mockResolvedValue({});

    const { result } = renderHook(() => useMovimientos());
    await waitFor(() => expect(result.current.movimientos).toEqual(sampleMovs));

    await act(async () => {
      await result.current.eliminar(0);
    });

    expect(movimientosApi.eliminar).toHaveBeenCalledWith(0);
  });
});
