import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketType = await ticketsService.getTicketType();
    return res.status(httpStatus.OK).send(ticketType);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    const { name } = error;

    if (name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function addTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  try {
    const insertedTicket = await ticketsService.addTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(insertedTicket);
  } catch (error) {
    if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
