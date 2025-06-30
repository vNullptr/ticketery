import express from 'express';
import got from 'got';
import { generateQrCode, generateQrUniqueData } from '../utils/qrcode.js';
import { ticketOptions } from '../models/tickets.js';
import { insertTicket } from '../utils/prisma.js';

const router = express.Router();

const getAccessToken = async ()=>{
    try {
        const base64Credentials = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');

        const response = await got.post(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
            headers: {
                "Authorization": `Basic ${base64Credentials}`,
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            form: {
                grant_type: 'client_credentials'
            },
            responseType: 'json',
        });

        return response.body.access_token;
    } catch (err){
        throw new Error(err);
    }
}

const createOrder = async (req, res) => {
    try {
        // Category Data
        const category = ticketOptions.find((v) => {return v.name.toLowerCase() === req.body.name.toLowerCase()}) 
        const productName = category.name;
        const price = category.price;

        // Access token for Order
        const accessToken = await getAccessToken();
        
        // Sent request to retrieve order ID for the link
        const response = await got.post(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            json: {
                intent: "CAPTURE",
                payment_source: {
                paypal: {
                    experience_context: {
                    payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                    landing_page: "LOGIN",
                    shipping_preference: "GET_FROM_FILE",
                    user_action: "PAY_NOW",
                    return_url: "https://example.com/returnUrl",
                    cancel_url: "https://example.com/cancelUrl"
                    }
                }
                },
                purchase_units: [
                {
                    custom_id: productName,
                    amount: {
                        currency_code: "USD",
                        value: price,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: price
                            }
                        }
                    },
                    items: [
                    {
                        name: productName + " Lust Ticket",
                        description: productName + " ticket to the Lust event",
                        unit_amount: {
                            currency_code: "USD",
                            value: price
                        },
                        quantity: "1",
                        category: "DIGITAL_GOODS",
                    },
                    ]
                }
                ]
            },
            responseType: 'json'
            })

        const orderId = response.body?.id;
        res.status(200).json({ orderId });
    } catch (error) {
        res.status(500).send("Error creating order: ", error.message);
    }
}

const capturePayment = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const { paymentId }  = req.params;

        const response = await got.post(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${paymentId}/capture`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                responseType: "json",
            }
        )

        const paymentData = response.body
        const ticketCategory = response.body.purchase_units?.[0].payments.captures?.[0]?.custom_id;
        
        if (paymentData.status !== "COMPLETED"){
            res.status(400).json({error:"Paypal payment incomplete or failed"});
            return;
        }

        //QR TOKEN
        const qrCodeData = generateQrUniqueData()
        
        // Inserting in Database
        insertTicket( paymentId, ticketCategory, qrCodeData.id)
        .catch(e=>console.error(e));

        // QR Code generation
        generateQrCode(qrCodeData)
        .then( (v) => {

            return res.status(200).json({
                message:"success",
                id: paymentId,
                qr: v
            })
        })
        .catch( (e) => {
            console.Error(e);
            res.status(400).send("Error generating QRCode (SERVER): ", error.message)
        })

    } catch ( error ){
        res.status(500).send("Error capturing payment: ", error.message)
    }
}

router.post('/create-order', createOrder);
router.get('/capture-payment/:paymentId', capturePayment);

export default router;