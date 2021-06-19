import express from "express";

import {
  distributorListRouter,
  newDistributorRouter,
  updateDistributorRouter,
  deleteDistributorRouter,
} from "./distributors";

const app = express();

app.use(distributorListRouter);
app.use(newDistributorRouter);
app.use(updateDistributorRouter);
app.use(deleteDistributorRouter);

export { app as distributorRouter };
