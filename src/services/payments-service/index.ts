import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentsRepository from "@/repositories/paymentss-repository";

async function getPayment(ticketId: number, userId: number): Promise<any> {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.Enrollment.User.id !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findPayment(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = {
  getPayment,
};

export default paymentsService;
