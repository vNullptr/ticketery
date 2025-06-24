import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'

const baseURL = "http://localhost:3000";

const Checkout = () => {
  const initialOptions = {
    clientId: "AaiSy2kJHBdCZnzAUrH8pWN8ZFvNEmgtZLQMYUbpDMMSzbACl4n9bJurtdw7SjG-Z-fKzLFEP2cnhz4y"
  }

  const style = {
    shape: "rect",
    layout: "vertical",
    color: "gold"
  }

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
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons 
          style={style}
          createOrder={onCreateOrder}
          //onApprove={onApprove}
          //onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default Checkout