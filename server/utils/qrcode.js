import qrcode from 'qrcode';
import {v4} from 'uuid';


export const generateQrUniqueData = () => {
    
    const uniqueId = v4();
    const qrdata = {
        id : uniqueId
    };

    return qrdata;
}

export const generateQrCode = async (data)=>{

    try{
        const qrUrl = await qrcode.toDataURL(JSON.stringify(data));
        return qrUrl;
    }catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }

}