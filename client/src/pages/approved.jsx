import React, { useEffect, useState } from 'react'
import { useSearchParams} from 'react-router-dom'
import Ticket from '../components/ticket'
import { utils } from '.././utils/consts.jsx'

const Approved = () => {

    const [searchParams] = useSearchParams();
    const [ticketData, setticketData] = useState(null);
    const [revealTicket, setrevealTicket] = useState(false);
    const id = searchParams.get("orderid");

    useEffect(()=>{

        fetch(utils.URL.BaseUrl+"api/verify/"+id)
        .then( res => {
            if (res.status == 200) return res.json();
            if (res.status == 204) return null;
        })
        .then( data => {
            if (!data) return;
            setticketData(data);
        })
        .catch(e=>console.error(e));

    },[]);

    const onRevealClick = () => {
        if (!ticketData) return;
        setrevealTicket(!revealTicket);
    }


    return (
    <div className="flex flex-col h-screen justify-center items-center text-primary text-3xl font-bold">
        Thanks for your purchase !
        <span className="font-extralight text-[0.5em] m-1">ID : {id}</span>
        <button className="h-[50px] w-[200px] bg-primary outline-none text-2xl rounded-[5px] font-bold text-black cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out mb-[20px] m-5" onClick={onRevealClick}>
            Reveal Ticket
        </button>
        {
            revealTicket &&
            <Ticket orderID={id} category={ticketData.category} qrLink={ticketData.qrLink} closeButton={onRevealClick} />
        }
    </div>
    )
}

export default Approved