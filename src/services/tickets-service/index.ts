import { notFoundError } from "@/errors";
import { TicketType } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import enrollmentRepository from "@/repositories/enrollment-repository";
import httpStatus, { BAD_REQUEST } from "http-status";

async function getTicketType(): Promise<TicketType[]> {
  const result = await ticketsRepository.findTicketsType();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getTicket(id: number): Promise<any> {
  const ticket = await ticketsRepository.findTicket(id);

  if (!ticket) {
    throw notFoundError();
  }

  return {
    ...exclude(ticket, "Enrollment"),
  };
}

async function addTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const ticket = await ticketsRepository.addTicket(enrollment.id, ticketTypeId);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

const ticketsService = {
  getTicketType,
  getTicket,
  addTicket,
};

export default ticketsService;
