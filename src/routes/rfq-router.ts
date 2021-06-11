import express from "express";

import { newRfqRouter, rfqListRouter } from "./rfqs";

const app = express();

app.use(newRfqRouter);
app.use(rfqListRouter);

export { app as rfqRouter };
