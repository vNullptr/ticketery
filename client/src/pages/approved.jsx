import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Ticket from '../components/ticket'

const Approved = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("orderid");


    return (
    <div className="flex flex-col h-screen justify-center items-center text-primary text-3xl font-bold">
        Thanks for your purchase
        <span className="font-extralight text-[0.5em] m-1">ID : {id}</span>
        <button className="h-[50px] w-[200px] bg-primary outline-none text-2xl rounded-[5px] font-bold text-black cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out mb-[20px] m-5">
            Reveal Ticket
        </button>
    </div>
    )
}

export default Approved