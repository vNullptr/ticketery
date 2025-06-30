import pkg from '@prisma/client'
const { PrismaClient } = pkg; // bcs we are using ES Modules
const prisma = new PrismaClient()


export async function findTicketByID(orderID){
    
    try {
        const ticket = await prisma.Ticket.findFirst({
            where: {
                orderID: orderID,
            }
        })
        return ticket;
    } catch (e){
        console.error(e);
        return null;
    }
}

export async function findTicketByToken(token){

    try {
        const ticket = await prisma.Ticket.findFirst({
            where: {
                qrToken: token,
            }
        })
        return ticket;
    } catch (e){
        console.error(e);
        return null;
    }

}

export async function insertTicket(orderId, category, qrToken){

    try {
        const ticket = await prisma.Ticket.create({data: {
            orderID: orderId,
            category: category,
            isUsed: false,
            qrToken: qrToken
        }})
    } catch(e){
        console.error(e);
    }


}