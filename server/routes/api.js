import express from 'express';
import { findTicketByID } from '../utils/prisma.js';
import { ticketOptions } from '.././models/tickets.js';
const router = express.Router();

const categoryFetch = (req, res) => {
    const rTicket = req.params.category.toLowerCase();
    if (rTicket) {
        const f = ticketOptions.find((v) => {return v.name.toLowerCase() == rTicket; })
        if (f){
            res.status(200).json(f);
        } else {
            res.status(204).end(); // 204 -> no content
        }
    } else {
        res.status(404).end(); // 404 -> not found
    }
}

const fetchAllTickets = (req, res)=>{
    res.json(ticketOptions);
}

const fetchByOrderID = (req, res) => {
    const orderID = req.params.orderID
    const Ticket = findTicketByID(orderID)
    .then(e => {
        res.status(200).json(e);
    })
    .catch(e => {
        res.status(204).end();
        console.log(e)
    })
    
}

router.get('/', (req, res) => {
    res.send('API is running!');
});

router.get("/tickets", fetchAllTickets)
router.get("/tickets/:category", categoryFetch)
router.get("/verify/:orderID", fetchByOrderID)

export default router;


