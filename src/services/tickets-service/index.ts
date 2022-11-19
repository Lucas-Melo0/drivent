import { notFoundError } from "@/errors";

import { TicketType } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketType(): Promise<TicketType[]> {
  const result = await ticketsRepository.findTicketsType();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

const ticketsService = {
  getTicketType,
};

export default ticketsService;
