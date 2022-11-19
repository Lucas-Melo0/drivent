import { notFoundError } from "@/errors";

import { TicketType } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";

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

const ticketsService = {
  getTicketType,
  getTicket,
};

export default ticketsService;
