import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';
const val = 5;
const defaultMessage = 'Oops!';
describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(val)).resolves.toBe(val);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const error = 'error';
    expect(() => throwError(error)).toThrow(error);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
