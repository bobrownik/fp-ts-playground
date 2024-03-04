// Backend endpoint code, which makes http call to external endpoint and throws
// different errors for each error status. Then I'll execute
// some higher level processing and eventually throw error,
import express from 'express';
import { createRouter } from './router';

const APP_PORT = 8878;

const app = express();

createRouter(app);

app.listen(APP_PORT);
