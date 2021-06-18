import express from "express";

import { distributorListRouter, newDistributorRouter } from "./distributors";

const app = express();

app.use(distributorListRouter);
app.use(newDistributorRouter);

export { app as distributorRouter };
