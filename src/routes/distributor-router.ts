import express from "express";

import { distributorListRouter } from "./distributors";

const app = express();

app.use(distributorListRouter);

export { app as distributorRouter };
