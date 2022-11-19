import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";

import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { tickedId } = req.query;

  if (!tickedId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.getPayment(Number(tickedId), userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    const { name } = error;
    if (name == "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (name == "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
