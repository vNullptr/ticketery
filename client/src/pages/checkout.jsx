import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { utils } from '.././utils/consts.jsx';
import Terms from '../components/terms.jsx';

const Checkout = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const Category = searchParams.get("category");
  const [ticket, setTicket] = useState(null); // Ticket data
  const [loading, setLoading] = useState(true); // loaded the ticket data or not
  const [checked, setChecked] = useState(false);
  const [termsOpened, settermsOpened] = useState(false);

  useEffect(()=>{

    if (!loading) return;

    fetch(utils.URL.BaseUrl+"api/tickets/"+Category)
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
      const response = await fetch(utils.URL.BaseUrl+"/checkout/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"name":ticket.name})
      });
      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  const onApprove = async (data)=>{
    try{
      if (!data?.orderID) throw new Error("Invalid order ID");

      const response = await fetch(utils.URL.BaseUrl+"/checkout/capture-payment/"+data.orderID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      const  result = await response.json()
      navigate("/approved?orderid="+result.id);

    } catch (error) {
      console.error("Error verifying paypal payment: ", error);
      navigate("/cancel");
    }
  }

  const onError = (e)=>{
    console.error("ERROR OCCURING WITH PAYPAL BUTTON : ", e);
    navigate("/cancel");
  }
  
  // not used for some reason gotta check 
  const onConditionCheck = () => {
    setChecked(!checked);
  }

  if (loading) {

    return (
      <div className="bg-black text-primary font-bold text-3xl flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  if (!ticket){
      return (
      <div className="bg-black text-primary font-bold text-5xl flex items-center justify-center h-screen">
        UNAVAILABLE
      </div>
      )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-black text-white">
      
      <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full gap-[50px]">
        
        <div className="h-[200px]">

          <div>
            <a className="text-primary text-2xl">Order summary</a>
            <span className="bg-primary opacity-50 w-full h-[1px] block mt-2 mb-4"></span>
          </div>
          <div className="flex flex-col items-start gap-[10px]">
            <div className="flex flex-row items-center justify-between w-[300px]">
              <span className="text-primary">{ticket.name} Lust Ticket</span>
              <span className="text-primary">{ticket.price}€</span>
            </div>
            <div className="flex flex-row items-center justify-between w-[300px]">
              <span className="text-primary">Total</span>
              <span className="text-primary">{ticket.price}€</span>
            </div>
          </div>
          <div className="mt-5">
            <input type="checkbox" className="cursor-pointer mr-1 translate-y-0.5 appearance-none border-1 border-primary h-3 w-3 rounded-[2px] checked:bg-primary transition duration-200" onClick={()=>setChecked(!checked)}></input>
            <label className="text-primary text-[0.8em] font-light">J'accepte les <a className="text-primary font-bold underline cursor-pointer" onClick={()=>settermsOpened(!termsOpened)} >termes et conditions</a></label>
          </div>

        </div>
      
        {
          termsOpened
          &&
          <Terms closeButton={()=>settermsOpened(!termsOpened)}/>
        }

        {
        checked
        && 
        <PayPalScriptProvider options={utils.PaypalButton.initialOptions}>
            <PayPalButtons 
              style={utils.PaypalButton.Style}
              createOrder={onCreateOrder}
              onApprove={onApprove}
              onError={onError}
            />
        </PayPalScriptProvider>
        }

      </div>

    </div>
  )
}

export default Checkout