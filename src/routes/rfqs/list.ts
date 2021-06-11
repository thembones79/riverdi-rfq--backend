import express from "express";
import { requireAuth } from "../../middlewares";
import { RfqRepo } from "../../repos/rfq-repo";

const router = express.Router();

router.get("/api/v1/rfqs", requireAuth, async (req, res) => {
  const users = await RfqRepo.find();
  res.send(users);
});

export { router as rfqListRouter };
