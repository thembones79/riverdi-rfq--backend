import express from "express";
import { userRouter } from "./user-router";
import { rfqRouter } from "./rfq-router";
import { requirementRouter } from "./requirement-router";

const app = express();

app.use(userRouter);
app.use(rfqRouter);
app.use(requirementRouter);

export { app as router };
