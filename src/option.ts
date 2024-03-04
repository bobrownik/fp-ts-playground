// type MyOption = Option<number>;

import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as assert from 'assert';

const myOptionalVar = 5;

const double = (number: number): number => {
  console.log('double');
  return Math.pow(number, 2);
};

// doubles of number is defined
const foldingFn = (number: number | undefined) => {
  return pipe(
    O.fromNullable(number),
    O.match(
      () => 'Number is undefined',
      (number: number) => `Double number is: ${double(number)}`
    )
  );
};

// console.log(foldingFn(10));

interface Fizz {
  buzz: string;
}

interface Foo {
  bar?: Fizz;
}

const foo = { bar: undefined } as Foo | undefined;

const res = pipe(
  foo,
  O.fromNullable,
  O.map(({ bar }) =>
    pipe(
      bar,
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  ),
  O.flatten
);

const head = <A>(array: ReadonlyArray<A>): O.Option<A> =>
  array.length === 0 ? O.none : O.some(array[0]);

const tail = <A>(array: ReadonlyArray<A>): O.Option<A> =>
  array.length === 0 ? O.none : O.some(array[array.length - 1]);

const inverse = (n: number): O.Option<number> =>
  n === 0 ? O.none : O.some(1 / n);

const functional = (array: ReadonlyArray<number>): string => {
  return pipe(
    array,
    head,
    O.map(double),
    O.chain(inverse),
    O.match(
      () => 'no result', // onNone handler
      (head) => `Result is ${head}` // onSome handler
    )
  );
};

// console.log(functional([10, 25, 33, 44, 55]));
// console.log(functional([]));

const headOfArrayOption = head([10, 25, 33, 44, 55]);

console.log(headOfArrayOption);

const eitherRight = E.left(1);
const eitherLeft = E.left('error');

console.log(eitherRight);
console.log(eitherLeft);

assert.deepStrictEqual(O.getLeft(), O.none);

// Fallback

const getFallbackValue = (array: ReadonlyArray<number>) => {
  return pipe(
    array,
    head,
    O.alt(() => tail(testArray)),
    O.getOrElse(() => 0)
  );
};

const testArray: ReadonlyArray<number> = [];

console.log(getFallbackValue(testArray));
