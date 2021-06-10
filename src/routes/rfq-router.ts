import express from "express";

import { newRfqRouter } from "./rfqs";

const app = express();

app.use(newRfqRouter);

export { app as rfqRouter };
