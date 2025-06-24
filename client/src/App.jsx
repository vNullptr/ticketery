import { useState } from 'react'
import thumbnail from './assets/thumbnail.png'
import share from './assets/share.svg'
import location from './assets/location.svg'
import date from './assets/date.svg'
import time from './assets/time.svg'
import arrow from './assets/down-arrow.svg'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import Checkout from './pages/checkout.jsx'
import { useEffect } from 'react'
import { utils } from './utils/consts.jsx'


function App() {

  const [tickets, setTickets] = useState([]);

  useEffect(()=>{

    fetch(utils.URL.ApiUrl+"/tickets")
    .then(res => res.json())
    .then(data => setTickets(data))
    .catch(err => console.error("Error fetching tickets:", err))

  },[])

  const [category, setCategory] = useState({"name": "Backstage","price": "600.0"})
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();


  const toggleCategory = () => {
    setDropdown(!dropdown)
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setDropdown(false);
  }

  const handlePurchase = () => {
    navigate(`/checkout?category=${category.name}`);
  }

  return (
    <Routes>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/" element={
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
          <div className="flex flex-col xl:flex-row w-[60%] h-[500px] gap-[100px]">

              <img src={thumbnail} className="flex-1">
              </img>
              
              <div className="relative flex-1 flex flex-col justify-between">

                <a className="text-primary text-5xl font-bold">À partir de 200 MAD</a>
                <div className="flex-1 flex flex-col items-start gap-[20px] mt-[50px] mb-[20px] text-primary text-[1.5em]">
                  <div>
                    <img className="-translate-x-1" src={location}></img>
                    
                  </div>
                  <div>
                    <img src={date}></img>

                  </div>
                  <div>
                    <img src={time}></img>

                  </div>
                </div>

                <div className="relative gap-0 mb-[10px]">
                  <div className="flex flex-row justify-between items-center h-[50px] border-[1px] border-solid border-primary rounded-[10px] p-[10px] z-9 cursor-pointer" onClick={() => toggleCategory()}>
                    <a className=" text-primary text-2xl z-11" >{category.name}</a>
                    <img  className="w-[40px] h-[40px]" src={arrow}></img>
                  </div>
                  {dropdown && 
                  <div className="absolute top-[40px] overflow-hidden bg-black w-[100%] border-solid border-[1px] border-primary rounded-b-[10px] border-t-0 z-10 pt-[5px]">
                    {tickets.map((cat, index)=>{
                      if (cat === category) return null;
                      return (
                        <div key={index} className="flex flex-row justify-between items-center h-[50px] rounded-[10px] p-[10px] z-9 cursor-pointer hover:bg-[rgb(10,10,10)] transition-all duration-300 ease-in-out" onClick={() => handleCategoryChange(cat)}>
                          <a className=" text-primary text-2xl z-11" >{cat.name}</a>
                        </div>
                      );
                    })}
                  </div>
                  }
                </div>

                <div className="flex flex-row gap-[5px] mt-[5px]">
                  <button className="flex-3 h-[50px] bg-primary outline-none text-2xl rounded-[10px] font-bold text-black cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out mb-[20px]" onClick={handlePurchase}>
                    {category.price} MAD
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
