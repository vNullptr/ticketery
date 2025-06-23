import express from 'express';
import got from 'got';

const router = express.Router();

const getAccessToken = async ()=>{
    try {
        const base64Credentials = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');

        const response = await got.post(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
            headers: {
                Authorization: `Basic ${base64Credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
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
        const accessToken = await getAccessToken();
        const response = await got.post(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            json: {
                intent: "CAPTURE",
                purchase_units: [
                    {
                    amount: {
                        currency_code: "MAD",
                        value: "100.00",
                        breakdown: {
                        item_total: {
                            currency_code: "MAD",
                            value: "100.00"
                        }
                        }
                    },
                    items: [
                        {
                        name: "Lust Ticket",
                        description: "Lust Ticket for the event",
                        quantity: "1",
                        unit_amount: {
                            currency_code: "MAD",
                            value: "100.00"
                        }
                        }
                    ]
                    }
                ],
                application_context: {
                    brand_name: "LUST TICKETS",
                    locale: "en-US",
                    user_action: "PAY_NOW",
                    shipping_preference: "NO_SHIPPING",
                    return_url: `${process.env.PAYPAL_REDIRECT_URL}/checkout/success`,
                    cancel_url: `${process.env.PAYPAL_REDIRECT_URL}/checkout/cancel`
                }
            },
            responseType: 'json',
        })


        console.log(response.body);
        res.status(200).send("success order created");
    } catch (error) {
        res.status(500).send("Error creating order: " + (error.reponse?.body || error.message));
    }
}

router.post('/create-order', createOrder);

export default router;