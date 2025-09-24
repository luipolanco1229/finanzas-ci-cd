import { test, expect, describe } from 'vitest';
import { formatResumen } from '../../../src/domain/resumen';

describe('formatResumen', () => {
  test('devuelve ceros cuando raw es null', () => {
    const r = formatResumen(null);
    expect(r).toEqual({
      ingresos: 0,
      gastos: 0,
      balance: 0,
      total_movimientos: 0,
      gastos_por_categoria: {},
    });
  });

  test('convierte valores numéricos', () => {
    const raw = { ingresos: '100', gastos: '50', balance: '50', total_movimientos: '2', gastos_por_categoria: { Hogar: 20 } };
    const r = formatResumen(raw);
    expect(r).toEqual({
      ingresos: 100,
      gastos: 50,
      balance: 50,
      total_movimientos: 2,
      gastos_por_categoria: { Hogar: 20 },
    });
  });
});
