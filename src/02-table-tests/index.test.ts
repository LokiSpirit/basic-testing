import { simpleCalculator, Action } from './index';

type TestCaseVars = {
  a: number | string;
  b: number | string;
  action: Action | string;
  expected: number | null;
}[];

const testCases: TestCaseVars = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 5, action: Action.Subtract, expected: 0 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 44, b: 2, action: Action.Divide, expected: 22 },
  { a: 82, b: 2, action: Action.Divide, expected: 41 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 5, b: 2, action: '&', expected: null },
  { a: '5', b: 2, action: Action.Exponentiate, expected: null },
  { a: 1, b: '5', action: Action.Exponentiate, expected: null },
  { a: '2', b: '5', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'should return $expected for $a, $b and $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
