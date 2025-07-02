import React from 'react';
import { useRef } from 'react';
import download from '../assets/download.svg';
import { toPng } from 'html-to-image';
import { data } from 'react-router-dom';

const Ticket = (props) => {

    const ticketRef = useRef();

    const handleDownload = async () => {

        try {
            const frame = ticketRef.current;

            const dataURL = await toPng(frame, {cacheBust: true});
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = "lust-ticket.png";
            link.click();
            
        } catch (e){
            console.error(e);
        }

    }

  return (
    <div className="fixed bg-black/70 backdrop-blur-sm h-screen w-screen flex flex-col items-center justify-center gap-[50px]">
        <button 
        className="absolute top-4 right-4 text-primary hover:text-white text-2xl"
        aria-label="Close ticket"
        onClick={props.closeButton}
      >
        <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:opacity-80 hover:scale-95 transition-all duration-75" // Optional hover effect
        >
            {/* Diagonal from top-left to bottom-right */}
            <path
                d="M6 6L18 18"
                stroke="#E0DCC3"
                strokeWidth="1"
                strokeLinecap="round"
            />
            {/* Diagonal from top-right to bottom-left */}
            <path
                d="M18 6L6 18"
                stroke="#E0DCC3"
                strokeWidth="1"
                strokeLinecap="round"
            />
        </svg>
      </button>

        <div ref={ticketRef}>

            <div className="w-100 h-65 m-0 p-0 bg-black text-primary font-sans shadow-2xl mx-auto border border-primary/30">
                {/* Ticket Header */}
                <div className="relative p-4 border-b border-primary">
                    <h2 className="text-2xl font-bold text-center uppercase tracking-wider">{props.category} ACCESS</h2>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>
                
                {/* Ticket Body */}
                <div className="flex">
                    {/* Main Content */}
                    <div className="flex-1 p-6">
                        <div className="flex items-center gap-6">
                            
                            {/* QR Code Placeholder */}
                            <div className="w-24 h-24 border-2 border-primary flex items-center justify-center">
                                <div className="text-xs text-center">
                                    <img src={props.qrLink} crossOrigin="anonymous" />
                                </div>
                            </div>
                            
                            {/* Ticket Details */}
                            <div className="flex-1">
                                <p className="text-lg font-bold uppercase mb-1">Summer Lust 2025</p>
                                <p className="text-sm mb-3">SAT, JUL 16 • 10:00 PM</p>
                                <div className="h-px w-full bg-primary opacity-30 my-2"></div>
                                <p className="text-xs mt-3">orderID: <span className="font-mono font-bold">{props.orderID}</span></p>
                            </div>

                        </div>
                    </div>

                </div>
                
                {/* Ticket Footer */}
                <div className="p-3 text-center text-xs border-t border-primary bg-black/50">
                    <p>Present this ticket at entrance</p>
                </div>

            </div>
    
        </div>

        <button className="bg-black border border-primary rounded-[10px] w-[50px] h-[50px] flex items-center justify-center hover:scale-95 hover:opacity-50 duration-50 transition-all ease-in" onClick={handleDownload}>
            <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
            >
            {/* Down arrow */}
                <path 
                    d="M12 4V16M12 16L8 12M12 16L16 12" 
                    stroke="#E0DCC3" 
                    stroke-width="1" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                {/* Horizontal line */}
                <path 
                    d="M5 20H19" 
                    stroke="#E0DCC3" 
                    stroke-width="1" 
                    stroke-linecap="round"
                />
            </svg>
        </button>
    </div>
  )
}

export default Ticket