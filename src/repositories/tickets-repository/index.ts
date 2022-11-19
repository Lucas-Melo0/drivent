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
async function findTicketById(id: number) {
  return prisma.ticket.findUnique({
    where: { id },
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
async function addTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  findTicketsType,
  findTicket,
  addTicket,
  findTicketById,
};

export default ticketsRepository;
