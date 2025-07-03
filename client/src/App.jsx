import { useState } from 'react'
import thumbnail from './assets/thumbnail.png'
import share from './assets/share.svg'
import location from './assets/location.svg'
import date from './assets/date.svg'
import time from './assets/time.svg'
import arrow from './assets/down-arrow.svg'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import Checkout from './pages/checkout.jsx'
import Approved from './pages/approved.jsx'
import Cancel from './pages/cancel.jsx'
import { useEffect } from 'react'
import { utils } from './utils/consts.jsx'


function App() {

  const [tickets, setTickets] = useState(null); // tickets data
  const [loading, setLoading] = useState(true); // loaded the tickets data or not
  const [category, setCategory] = useState(0); // index 
  const [dropdown, setDropdown] = useState(false); // drop down open or not

  const navigate = useNavigate();

  useEffect(()=>{

    if (!loading) return;

    fetch(utils.URL.ApiUrl+"/tickets")
    .then(res => {
      return res.json()
    })
    .then(data => {
      setTickets(data);
      setLoading(false);
    })
    .catch(err => console.error("Error fetching tickets:", err))

  },[])

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setDropdown(false);
  }

  const handlePurchase = () => {
    navigate(`/checkout?category=${tickets[category].name}`);
  }

  if (loading) {
    return (
      <div className="bg-black text-primary font-bold text-xl lg:text-3xl flex items-center justify-center h-screen text-center">
        Loading... Consider refreshing the page !
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/approved" element={<Approved />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/" element={
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
          <div className="flex flex-col xl:flex-row w-[60%] h-[500px] gap-[100px]">

              <img src={thumbnail} className="flex-1">
              </img>
              
              <div className="relative flex-1 flex flex-col justify-between">

                <a className="text-primary text-3xl md:text-5xl font-bold">À partir de 55 EUR</a>
                <div className="flex-1 flex flex-col items-start gap-[20px] mt-[50px] mb-[20px] text-primary text-[1.5em]">
                  <div>
                    <img className="-translate-x-1 inline mr-4" src={location}></img>
                    Marrakech
                  </div>
                  <div>
                    <img src={date} className="inline mr-5"></img>
                    19 juillet
                  </div>
                  <div>
                    <img src={time} className="inline mr-6"></img>
                    10pm
                  </div>
                </div>

                <div className="relative gap-0 mb-[10px]">
                  <div className="flex flex-row justify-between items-center h-[50px] border-[1px] border-solid border-primary rounded-[10px] p-[10px] z-9 cursor-pointer" onClick={() => { setDropdown(!dropdown) }}>
                    <a className=" text-primary text-2xl z-11" >{tickets[category].name}</a>
                    <img  className="w-[40px] h-[40px]" src={arrow}></img>
                  </div>
                  {dropdown && 
                  <div className="absolute top-[40px] overflow-hidden bg-black w-[100%] border-solid border-[1px] border-primary rounded-b-[10px] border-t-0 z-10 pt-[5px]">
                    {tickets.map((cat, index)=>{
                      if (cat === tickets[category]) return null;
                      return (
                        <div key={index} className="flex flex-row justify-between items-center h-[50px] rounded-[10px] p-[10px] z-9 cursor-pointer hover:bg-[rgb(10,10,10)] transition-all duration-300 ease-in-out" onClick={() => handleCategoryChange(index)}>
                          <a className=" text-primary text-2xl z-11" >{cat.name}</a>
                        </div>
                      );
                    })}
                  </div>
                  }
                </div>

                <div className="flex flex-row gap-[5px] mt-[5px]">
                  <button className="flex-3 h-[50px] bg-primary outline-none text-xl rounded-[10px] font-bold text-black cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out mb-[20px]" onClick={handlePurchase}>
                    {tickets[category].price} EUR
                  </button>
                  <button id="categorySelector" className="flex items-center justify-center w-[50px] h-[50px] rounded-[10px] outline-none border-solid border-[1px] border-primary cursor-pointer">
                    <img className="w-[30px] h-[30px]" src={share}></img>
                  </button>
                </div>

              </div>

            </div>
        </div>
      }/>
    </Routes>
)

}

export default App
