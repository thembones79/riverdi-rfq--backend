import express from "express";
import { requireAuth } from "../../middlewares";
import { RfqRepo } from "../../repos/rfq-repo";
import { NotFoundError } from "../../errors";

const router = express.Router();

router.get("/api/v1/rfqs/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const rfq = await RfqRepo.findById(id);

  if (!rfq) {
    throw new NotFoundError();
  }

  res.send(rfq);
});

export { router as showRfqRouter };
