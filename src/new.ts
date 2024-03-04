// Scenario #1: Return tasks from "core" functions

import { Either } from 'fp-ts/lib/Either';
import { Task } from 'fp-ts/lib/Task';

// "core" business logic code
declare function getUserById(id: ID): Task<Either<ApiError, User>>;

// in view layer code
const getUserOrHandleError = (id: ID): Task<void> =>
  pipe(
    getUserById(id),
    taskEither.orLeft(goToLoginPageOn401),
    taskEither.orLeft(displayForbiddenMessage),
    taskEither.map((user) =>
      displaySuccessMessage(`Found user: "${user.name}"`)
    )
  );

async function onClickSubmitButton(): Promise<void> {
  return getUserOrHandleError(getUserIdFormValue())();
}

// Scenario #2: Only use Tasks when needed

// "core" business logic code
declare async function getUserById(id: ID): Promise<Either<ApiError, User>>;

// in view layer code
const getUserOrHandleError = (id: ID): Promise<void> =>
  pipe(
    () => getUserById(id), // create a task
    taskEither.orLeft(goToLoginPageOn401),
    taskEither.orLeft(displayForbiddenMessage),
    taskEither.map((user) =>
      displaySuccessMessage(`Found user: "${user.name}"`)
    )
  )();

async function onClickSubmitButton(): Promise<void> {
  return getUserOrHandleError(getUserIdFormValue());
}
