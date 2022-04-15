
import { khaltiRequest } from "./requestMethods";




export const config = {
    // replace this key with yours
    "publicKey": "test_public_key_5839f57fa14d4b8d8ee69fa1afffa1c4",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            let data = {
                "token": payload.token,
                "amount": payload.amount/100,
                "mobile": payload.mobile
            };
            
            let config = {
                headers: {'Authorization': process.env.REACT_APP_KHALTI_KEY}
            };
            khaltiRequest.post("https://khalti.com/api/v2/payment/verify/", data, config,
            )
            .then(response => {
                console.log(response.data);
                window.location.replace('/success')
            })
            .catch(error => {
                console.log(error);
            });
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};