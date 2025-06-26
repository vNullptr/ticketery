import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {

    const navigate = useNavigate();

    const onReturn = () => {
        navigate("/")
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center text-primary text-3xl font-bold">
            Issue occured when purchasing !
            <button className="h-[50px] w-[200px] bg-primary outline-none text-2xl rounded-[10px] font-bold text-black cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out mb-[20px] m-5" onClick={onReturn}>
                Go Back
            </button>
        </div>
    )
}

export default Cancel