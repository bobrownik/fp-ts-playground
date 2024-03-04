import dotenv from 'dotenv';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { readFile as asyncReadFile, readFileSync } from 'fs';
import { readFile as promiseReadFile } from 'fs/promises';

const DOT_ENV_FILE_PATH = '.env';

const getRejectablePromise = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const funcsToCall = [resolve, reject];
    const randomFuncIndex = Math.round(Math.random());
    const randomTimeout = Math.random() * (1000 - 300) + 300;
    const data = '123';

    setTimeout(() => {
      funcsToCall[randomFuncIndex](data);
    }, randomTimeout);
  });
};

const retErrorOnReject = () => {
  return TE.tryCatch(
    () => getRejectablePromise(),
    (error) => new Error(error as string)
  );
};

const parseWithSyncReadFile = () => {
  const res = E.tryCatch(() => readFileSync(DOT_ENV_FILE_PATH), E.toError);
  return pipe(
    E.tryCatch(() => readFileSync(DOT_ENV_FILE_PATH), E.toError),
    E.map((dotEnvContent) => dotenv.parse(String(dotEnvContent))),
    E.mapLeft((error) => { throw error })
  );
};

const parseWithAsyncReadFile = () => {
  return pipe(
    DOT_ENV_FILE_PATH,
    TE.taskify(asyncReadFile),
    TE.map((dotEnvContent) => dotenv.parse(String(dotEnvContent)))
  );
};

const parseWithPromiseReadFile = () => {
  return pipe(
    TE.tryCatch(() => promiseReadFile(DOT_ENV_FILE_PATH), String),
    TE.map((dotEnvContent) => dotenv.parse(String(dotEnvContent)))
  );
};

const result1 = parseWithAsyncReadFile();
const result2 = parseWithPromiseReadFile();
const result3 = parseWithSyncReadFile();

const result = retErrorOnReject();
