import pkg from '@prisma/client'
const { PrismaClient } = pkg; // bcs we are using ES Modules
const prisma = new PrismaClient()

async function main(){

    const ticket = await prisma.Ticket.create({data: {
        orderID: "testorderid",
        category: "VIP",
        isUsed: false,
        qrToken: "GFAS8G43AFG452G6GFA976G7A6G79AAHNAV9A"
    }})

    console.log(ticket);

}


main()
    .catch(e => {
        console.error(e);
    })
    .finally(async ()=> {
        await prisma.$disconnect();
    })

export default prisma;