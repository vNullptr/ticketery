import express from 'express';
import { ticketOptions } from '.././models/tickets.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is running!');
});

router.get("/tickets", (req, res)=>{
    res.json(ticketOptions);
})

router.get("/tickets/:category", (req, res) => {
    const rTicket = req.params.category.toLowerCase();
    if (rTicket) {
        const f = ticketOptions.find((v) => {return v.name.toLowerCase() == rTicket; })
        if (f){
            res.status(200).json(f);
        } else {
            res.status(204).end(); // 204 -> no content
        }
    } else {
        res.status(404); // 404 -> not found
    }
})

export default router;


