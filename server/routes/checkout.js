import express from 'express';
import got from 'got';

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
        const accessToken = await getAccessToken();
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
                    amount: {
                        currency_code: "USD",
                        value: "400.00",
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: "400.00"
                            }
                        }
                    },
                    items: [
                    {
                        name: "Backstage Lust Ticket",
                        description: "Backstage ticket to the Lust event",
                        unit_amount: {
                            currency_code: "USD",
                            value: "400.00"
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
        res.status(500).send("Error creating order: " + (error.reponse?.message || error.message));
    }
}

router.post('/create-order', createOrder);

export default router;