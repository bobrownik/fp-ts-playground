import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

const validateProperLength = (jobNumber: string) => {
  return jobNumber.length === 10
    ? E.right(true)
    : E.left('jobNumber length should equal to 10');
};

const validateStartsWithZero = (jobNumber: string) => {
  return jobNumber[0] === '0'
    ? E.right(true)
    : E.left('jobNumber should start with 0');
};

// Run validators. If there's any error, then show error list.
// const validateJobNumber = (jobNumber: string) => {
//   const jobNumberValidators = [validateProperLength, validateStartsWithZero];

//   const validationErrors = jobNumberValidators.reduce(
//     (errors: Error[], validator: () => E.Either<E.Left, E.Right<string>>) => {
//       const validationResult = validator(jobNumber);
//       const error = E.mapLeft((error: string) => new Error(error))(
//         validationResult
//       );

//       return error ? [...errors, error] : errors;
//     },
//     [] as Error[]
//   );

//   console.log(validationErrors);
// };

const testJobNumber = '00000789182';

// validateJobNumber(testJobNumber);

const validateChainManual = (jobNumber: string) => {
  const either = pipe(
    E.right(jobNumber),
    E.fold
    E.chain(validateProperLength),
    E.chain(validateStartsWithZero)
  );
};

const hasProperLength = (jobNumber: string) => {
  return jobNumber.length === 10;
};

const startsWithZero = (jobNumber: string) => {
  return jobNumber[0] === '0';
};

const validateWithFilterOrElse = (jobNumber: string) => {
  const result = pipe(
    E.of(jobNumber),
    E.filterOrElse(
      hasProperLength,
      () => 'jobNumber length should equal to 10'
    ),
    E.filterOrElse(startsWithZero, () => 'jobNumber should start with 0')
  );

  console.log(result);
};

validateWithFilterOrElse('0000000019');
validateWithFilterOrElse('00000000123');
validateWithFilterOrElse('1000000000');
validateWithFilterOrElse('10000000123');
