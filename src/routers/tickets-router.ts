import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsType } from "@/controllers/tickets-controller";
const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/types", getTicketsType);

export { ticketsRouter };
