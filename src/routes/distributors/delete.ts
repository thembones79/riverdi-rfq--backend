import express from "express";

import { requireAuth } from "../../middlewares";
import { BadRequestError } from "../../errors";
import { DistributorRepo } from "../../repos/distributor-repo";

const router = express.Router();

router.delete("/api/v1/distributors/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  let existingDistributor = await DistributorRepo.findById(id);
  if (!existingDistributor) {
    throw new BadRequestError("Distributor does not exists");
  }

  const deletedDistributor = await DistributorRepo.delete(id);
  res.send(deletedDistributor);
});

export { router as deleteDistributorRouter };