import express from "express";

import { newRfqRouter, rfqListRouter, showRfqRouter } from "./rfqs";

const app = express();

app.use(newRfqRouter);
app.use(rfqListRouter);
app.use(showRfqRouter);

export { app as rfqRouter };
