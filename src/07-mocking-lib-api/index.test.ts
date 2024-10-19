import axios from 'axios';
import { throttledGetDataFromApi } from './index';
const baseUrl = 'https://jsonplaceholder.typicode.com';
const relPath = 'users';
const mockData = 'Helga';
interface Callable {
  (...args: unknown[]): unknown;
}

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: Callable) => fn,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockFn = jest.fn().mockResolvedValue({ data: mockData });

    (axios.create as jest.Mock).mockImplementation(() => ({
      get: mockFn,
    }));
  });

  test('should create instance with provided base url', async () => {

    await throttledGetDataFromApi(relPath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relPath);
    expect(axios.create().get).toBeCalledWith(relPath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(relPath);
    expect(response).toEqual(mockData);
  });
});
