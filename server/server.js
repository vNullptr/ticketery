import express from 'express';
import cors from 'cors';
import apiRoute from './routes/api.js';
import checkoutRoute from './routes/checkout.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({
    methods: ['GET', 'POST']
}));

// Middleware
app.use(express.json());

// Routers
app.use("/api", apiRoute); // will use later to handle VALIDATION
app.use("/checkout", checkoutRoute); 

app.listen(process.env.PORT || 3000);