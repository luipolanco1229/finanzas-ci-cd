import { test, expect, describe } from 'vitest';
import { validarMovimiento } from '../../src/domain/movimiento';

describe('validarMovimiento', () => {
  test('valida un ingreso correcto', () => {
    const draft = { tipo: 'ingreso', monto: 100, descripcion: 'Salario', categoria: 'Trabajo' };
    const res = validarMovimiento(draft);
    expect(res.ok).toBe(true);
    expect(res.errors).toEqual({});
    expect(res.value.monto).toBe(100);
  });

  test('rechaza tipo inválido', () => {
    const res = validarMovimiento({ tipo: 'otro', monto: 10 });
    expect(res.ok).toBe(false);
    expect(res.errors.tipo).toBe('Tipo inválido');
  });

  test('rechaza monto <= 0', () => {
    const res = validarMovimiento({ tipo: 'gasto', monto: 0 });
    expect(res.ok).toBe(false);
    expect(res.errors.monto).toBe('Monto > 0');
  });

  test('rechaza descripcion muy larga', () => {
    const res = validarMovimiento({ tipo: 'ingreso', monto: 1, descripcion: 'x'.repeat(121) });
    expect(res.ok).toBe(false);
    expect(res.errors.descripcion).toBe('Máx 120 chars');
  });

  test('rechaza categoria muy larga', () => {
    const res = validarMovimiento({ tipo: 'ingreso', monto: 1, categoria: 'x'.repeat(61) });
    expect(res.ok).toBe(false);
    expect(res.errors.categoria).toBe('Máx 60 chars');
  });
});
