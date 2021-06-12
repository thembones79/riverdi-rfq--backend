import express from "express";

import { newRequirementRouter } from "./requirements";

const app = express();

app.use(newRequirementRouter);

export { app as requirementRouter };
