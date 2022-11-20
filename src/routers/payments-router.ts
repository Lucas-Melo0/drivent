import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayment } from "@/controllers/payments-controler";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).get("/", getPayment);

export { paymentsRouter };
