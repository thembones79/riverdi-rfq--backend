import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest, requireAuth } from "../../middlewares";
import { spFileCreate } from "../../services/spFileCreate";
import { BadRequestError } from "../../errors";
import { RfqRepo } from "../../repos/rfq-repo";
import { UserRepo } from "../../repos/user-repo";
import { generateRfqCode } from "../../services/rfqNoGenerator";
import { ClickUp } from "../../services/clickup";

const router = express.Router();

router.post(
  "/rfqs",
  requireAuth,
  [
    body("eau")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("You must supply a EAU"),
    body("customer_id")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("You must supply a CustomerId"),
    body("distributor_id")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("You must supply a DistributorId"),
    body("pm_id")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("You must supply a PmId"),
    body("kam_id")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("You must supply a KamId"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { eau, customer_id, distributor_id, pm_id, kam_id } = req.body;

    const kam = await UserRepo.findById(kam_id);
    if (!kam) {
      throw new BadRequestError("KAM does not exist");
    }

    const pm = await UserRepo.findById(pm_id);
    if (!pm) {
      throw new BadRequestError("PM does not exist");
    }

    const pmEmail = pm.email as string;

    let rfq_code = generateRfqCode(customer_id);
    let existingRfq = await RfqRepo.findByRfqCode(rfq_code);
    while (existingRfq) {
      rfq_code = generateRfqCode(customer_id);
      existingRfq = await RfqRepo.findByRfqCode(rfq_code);
    }

    const clickupId = await ClickUp.createTask({ pmEmail, rfqCode: rfq_code });

    const rfq = await RfqRepo.insert({
      rfq_code,
      eau,
      customer_id,
      distributor_id,
      pm_id,
      kam_id,
      clickup_id: clickupId,
    });

    await spFileCreate({ kam: kam.shortname, rfq_code });

    res.status(201).send(rfq);
  }
);

export { router as newRfqRouter };
