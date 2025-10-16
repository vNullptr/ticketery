
export const utils = {
    "URL":{
        "BaseUrl":"http://localhost:3000", // replace here with your back end URL
    },
    "PaypalButton":{
        "Style": {shape: "rect",layout: "vertical"},
        "initialOptions": {
            clientId: "YOUR_PAYPAL_CLIENT_ID", // need to make a config file for this kind of stuff perhaps 
            currency: "EUR"
        }
    }
}