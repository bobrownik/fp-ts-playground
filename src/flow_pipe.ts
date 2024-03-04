import { pipe } from 'fp-ts/function';

const double = (number: number) => {
  console.log('double');
  return Math.pow(number, 2);
};

const triple = (number: number) => {
  console.log('triple');
  return Math.pow(number, 3);
};

const squareRoot = (number: number) => {
  console.log('squareRoot');
  return Math.sqrt(number);
};

const divideByItself = (number: number) => {
  console.log('divideByItself');
  return number / number;
};

const sum = (firstNumber: number, secondNumber: number) => {
  return firstNumber + secondNumber;
};

const curriedSum = (firstNumber: number) => {
  return (secondNumber: number) => {
    return firstNumber + secondNumber;
  };
};

const divideByItselfIfNotZero = (number: number) => {
  return number === 0 ? undefined : number / number;
};

const flow = (...fns: Function[]) => {
  return (...firstFnCallArgs: unknown[]) => {
    const isFirstNonUnary = firstFnCallArgs.length > 1;

    return fns.reduce((previousFnResult, currentFn, currentIndex) => {
      const isFirstElement = currentIndex === 0;

      return isFirstNonUnary && isFirstElement
        ? currentFn(...previousFnResult)
        : currentFn(previousFnResult);
    }, firstFnCallArgs);
  };
};

const composedFlowFns = flow(sum, double, triple, squareRoot);
console.log(composedFlowFns(5, 3));
// const curriedSum = curry(sum);
const pipeResult = pipe(5, curriedSum(3), double, triple, squareRoot);
console.log(pipeResult);
