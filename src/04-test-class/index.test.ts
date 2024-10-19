import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

const initialBalance = 5.0;
let account: BankAccount;

describe('BankAccount', () => {
  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(10.0)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      account.transfer(10.0, getBankAccount(initialBalance)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(2.0, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositAmount = 3.0;
    expect(account.deposit(depositAmount).getBalance()).toBeCloseTo(
      initialBalance + depositAmount,
    );
  });

  test('should withdraw money', () => {
    const withdrawAmount = 3.0;
    const resultAmount = initialBalance - withdrawAmount;
    expect(account.withdraw(withdrawAmount).getBalance()).toBeCloseTo(
      resultAmount,
    );
  });

  test('should transfer money', () => {
    const transferAmount = 3.0;
    const initSum = 10.0;
    const accountToTransferMoney = getBankAccount(initSum);
    expect(
      account.transfer(transferAmount, accountToTransferMoney).getBalance(),
    ).toBe(initialBalance - transferAmount);
    expect(accountToTransferMoney.getBalance()).toBe(initSum + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const returnedValue = 10.0;
    const mockRandom = 0.5;
    (random as jest.Mock).mockReturnValueOnce(returnedValue);
    (random as jest.Mock).mockReturnValueOnce(mockRandom);
    const val = await account.fetchBalance();
    expect(typeof val).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const returnedValue = 10.0;
    const mockRandom = 0.5;
    (random as jest.Mock).mockReturnValueOnce(returnedValue);
    (random as jest.Mock).mockReturnValueOnce(mockRandom);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(returnedValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const returnedValue = 10.0;
    const mockZero = 0;
    (random as jest.Mock).mockReturnValueOnce(returnedValue);
    (random as jest.Mock).mockReturnValueOnce(mockZero);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError
    );
  });
});
