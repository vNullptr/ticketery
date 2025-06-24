import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { utils } from '.././utils/consts.jsx'

const Checkout = () => {

  const [searchParams] = useSearchParams();

  const Category = searchParams.get("category");
  const [tickets, setTickets] = useState([]);

  useEffect(()=>{

    fetch(utils.URL.ApiUrl+"/tickets")
    .then(res => res.json())
    .then(data => setTickets(data))
    .catch(err => console.error("Error fetching tickets:", err))

  },[])

  console.log(tickets.find(cat => cat.name === Category));

  const onCreateOrder = async () => {
    try {
      const response = await fetch(baseURL+"/checkout/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        /*body: JSON.stringify({
          category: Category
        })*/
      });
      const data = await response.json()
      console.log("Order created:", data.orderId);
      return data.orderId;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-black text-white">
      <div className="flex flex-row items-center justify-center w-full h-full gap-[50px]">
        
        <div className="h-[200px]">

          <div>
            <a className="text-primary text-2xl">Order summary</a>
            <span className="bg-primary opacity-50 w-full h-[1px] block mt-2 mb-4"></span>
          </div>
          <div className="flex flex-col items-start gap-[10px]">
            <div className="flex flex-row items-center justify-between w-[300px]">
              <span className="text-primary">{Category} Lust Ticket</span>
              <span className="text-primary">{30}</span>
            </div>
            <div className="flex flex-row items-center justify-between w-[300px]">
              <span className="text-primary">Total</span>
              <span className="text-primary">{20}</span>
            </div>
          </div>

        </div>

        <PayPalScriptProvider options={utils.PaypalButton.initialOptions}>
            <PayPalButtons 
              style={utils.PaypalButton.Style}
              createOrder={onCreateOrder}
              //onApprove={onApprove}
              //onError={onError}
            />
        </PayPalScriptProvider>
      </div>

    </div>
  )
}

export default Checkout