import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { utils } from '.././utils/consts.jsx'

const Checkout = () => {

  const [searchParams] = useSearchParams();

  const Category = searchParams.get("category");
  const [ticket, setTicket] = useState(null); // ticket data
  const [loading, setLoading] = useState(true); // loaded the ticket data or not

  useEffect(()=>{

    if (!loading) return;

    fetch(utils.URL.ApiUrl+"/tickets/"+Category)
    .then(res => {
      if (res.status == 200) return res.json();
      if (res.status == 204) return null;
    })
    .then(data => {
      setTicket(data);
      setLoading(false);
    })
    .catch(err => console.error("Error fetching tickets:", err))

  },[])

  const onCreateOrder = async () => {
    try {
      const response = await fetch(baseURL+"/checkout/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        /*body: JSON.stringify()*/
      });
      const data = await response.json()
      console.log("Order created:", data.orderId);
      return data.orderId;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
  }

  if (loading) {

    return (
      <div className="bg-black text-primary font-bold text-3xl flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  if (!ticket){
      console.log("wassup");
      return (
      <div className="bg-black text-primary font-bold text-5xl flex items-center justify-center h-screen">
        UNAVAILABLE
      </div>
      )
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