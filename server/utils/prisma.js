import pkg from '@prisma/client'
const { PrismaClient } = pkg; // bcs we are using ES Modules
const prisma = new PrismaClient()

export async function insertTicket(orderId, category, qrToken){

    const ticket = await prisma.Ticket.create({data: {
        orderID: orderId,
        category: category,
        isUsed: false,
        qrToken: qrToken
    }})

    console.log(ticket);

}