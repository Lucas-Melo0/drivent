import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { addTicket, getTicket, getTicketsType } from "@/controllers/tickets-controller";
const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/types", getTicketsType).get("/", getTicket).post("/", addTicket);

export { ticketsRouter };
