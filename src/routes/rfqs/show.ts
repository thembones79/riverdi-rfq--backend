import express from "express";
import { requireAuth } from "../../middlewares";
import { RfqRepo } from "../../repos/rfq-repo";
import { NotFoundError } from "../../errors";
import { ClickUp } from "../../services/clickup";

const router = express.Router();

router.get("/rfqs/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  let rfq = await RfqRepo.findById(id);

  if (!rfq) {
    throw new NotFoundError();
  }

  const status = await ClickUp.getTaskStatus(rfq.clickup_id);
  rfq = { ...rfq, status };
  console.log({ rfq });
  res.send(rfq);
});

export { router as showRfqRouter };
