import express from "express";
import { userRouter } from "./user-router";
import { rfqRouter } from "./rfq-router";
const app = express();
app.use(userRouter);
app.use(rfqRouter);
export { app as router };
