
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const add = simpleCalculator({ a: 5, b: 5, action: Action.Add });
    expect(add).toBe(10);
  });

  test('should subtract two numbers', () => {
    const subtract = simpleCalculator({ a: 5, b: 5, action: Action.Subtract });
    expect(subtract).toBe(0);
  });

  test('should multiply two numbers', () => {
    const multiply = simpleCalculator({ a: 5, b: 5, action: Action.Multiply });
    expect(multiply).toBe(25);
  });

  test('should divide two numbers', () => {
    const divide = simpleCalculator({ a: 5, b: 5, action: Action.Divide });
    expect(divide).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const exponentiate = simpleCalculator({
      a: 5,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(exponentiate).toBe(25);
  });

  test('should return null for invalid action', () => {
    const invalid = simpleCalculator({ a: 5, b: 2, action: 'k' });
    expect(invalid).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const invalid = simpleCalculator({ a: 'a', b: 2, action: Action.Add });
    expect(invalid).toBe(null);
  });
});
