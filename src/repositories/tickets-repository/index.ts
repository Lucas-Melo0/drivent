import { prisma } from "@/config";

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        User: {
          id: userId,
        },
      },
    },
    include: {
      TicketType: true,
      Enrollment: {
        include: {
          User: true,
        },
      },
    },
  });
}

const ticketsRepository = {
  findTicketsType,
  findTicket,
};

export default ticketsRepository;
