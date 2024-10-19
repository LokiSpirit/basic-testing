import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const mockTimeout = 10000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCb = jest.fn();

    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCb, mockTimeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(mockCb, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const mockCb = jest.fn();

    doStuffByTimeout(mockCb, mockTimeout);
    expect(mockCb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeout);
    expect(mockCb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCb = jest.fn();

    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockCb, mockTimeout);

    expect(setInterval).toHaveBeenCalledWith(mockCb, mockTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCb = jest.fn();
    doStuffByInterval(mockCb, mockTimeout);
    expect(mockCb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeout);
    expect(mockCb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(mockTimeout);
    expect(mockCb).toHaveBeenCalledTimes(2);
  });
});

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('readFileAsynchronously', () => {
  const mockPathToFile = './test.txt';
  const mockFileContent = 'simple content';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockPathToFile);
    expect(join).toHaveBeenCalledWith(expect.any(String), mockPathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const content = await readFileAsynchronously(mockPathToFile);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockFileContent));
    const content = await readFileAsynchronously(mockPathToFile);
    expect(content).toBe(mockFileContent);
  });
});
