import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest } from "../../middlewares";
import { BadRequestError } from "../../errors";
import { RfqRepo } from "../../repos/rfq-repo";

const router = express.Router();

router.post(
  "/api/v1/rfqs",
  [
    body("rfq_code")
      .trim()
      .toUpperCase()
      .isLength({ min: 11, max: 21 })
      .withMessage("RFQ Code must be between 11 and 21 characters"),
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
    const { rfq_code, eau, customer_id, distributor_id, pm_id, kam_id } =
      req.body;
    const existingRfq = await RfqRepo.findByRfqCode(rfq_code);
    if (existingRfq) {
      throw new BadRequestError("RFQ Code in use", "rfq_code");
    }

    const rfq = await RfqRepo.insert({
      rfq_code,
      eau,
      customer_id,
      distributor_id,
      pm_id,
      kam_id,
    });

    res.status(201).send(rfq);
  }
);

export { router as newRfqRouter };
