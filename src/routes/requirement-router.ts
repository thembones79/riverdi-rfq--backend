import express from "express";

import {
  newRequirementRouter,
  showRequirementsForRfqRouter,
} from "./requirements";

const app = express();

app.use(newRequirementRouter);
app.use(showRequirementsForRfqRouter);

export { app as requirementRouter };
