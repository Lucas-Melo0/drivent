import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicket, getTicketsType } from "@/controllers/tickets-controller";
const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/types", getTicketsType).get("/", getTicket);

export { ticketsRouter };
