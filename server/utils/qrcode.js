const qr = require('qrcode');
const uuid = require('uuid');

const generateQrUniqueData = () => {
    
    const uniqueId = uuid.v4();
    const qrdata = {
        id : uniqueId,
        isUsed: false
    };

    return JSON.stringify(qrdata);
}

const generateQrCode = async (data)=>{

    try{
        const qrUrl = await qr.toDataURL(data);
        return qrUrl;
    }catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }

}