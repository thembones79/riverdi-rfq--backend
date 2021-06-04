import express from "express";
import { userRouter } from "./user-router";
const app = express();
app.use(userRouter);
export { app as router };
