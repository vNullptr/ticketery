import express from 'express';
import { ticketOptions } from '.././models/tickets.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is running!');
});

router.get("/tickets", (req, res)=>{
    res.json(ticketOptions);
})

export default router;


