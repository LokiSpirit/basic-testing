import { generateLinkedList } from './index';
type Node = {
  value: string | null;
  next: Node | null;
};

const list: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'j', 'k', 'm'];
const nodeList: Node = {
  value: 'a',
  next: {
    value: 'b',
    next: {
      value: 'c',
      next: {
        value: 'd',
        next: {
          value: 'e',
          next: {
            value: 'f',
            next: {
              value: 'g',
              next: {
                value: 'j',
                next: {
                  value: 'k',
                  next: {
                    value: 'm',
                    next: {
                      value: null,
                      next: null,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  let result: Node;

  beforeEach(() => {
    result = generateLinkedList(list);
  });

  test('should generate linked list from values 1', () => {
    expect(result).toStrictEqual(nodeList);
  });

  test('should generate linked list from values 2', () => {
    expect(result).toMatchSnapshot();
  });
});
