import { Buy, Welcome, Sell} from './components'
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { transactionContext } from "./context/transactionContext";
import React, {useContext} from "react";

import logo from '../images/logo.png';

import { useState } from 'react';
import Exchange from './components/Exchange';
import Claim from './components/Claim'
import Owner from './components/Owner'


const App = () => {

  const {connectedAccount} = useContext(transactionContext);
  const [renderedComponent, setRendered] = useState(<Welcome/>); 



  const handleClick = (value) => {
    if(value == 0){
      setRendered(<Buy />);
      console.log(connectedAccount);
    }else if (value == 1){
      setRendered(<Welcome />);
    }else if(value == 3){
      setRendered(<Claim />);
    }else if(value == 4){
      setRendered(<Owner />);
    }else{
      setRendered(<Exchange />);
    }
  }


  return (
    <div className="min-h-screen">
      <div className='bg-gradient-to-r from-amber-800 to-amber-500'>
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
              <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                  <img src = {logo} alt = "logo" className='w-32 cursor-pointer w-/12'>
                  </img>
              </div>
              <ul className='text-white md:flex hiddent list-none flex-row justify-between items-center flex-initial'> 
                  {connectedAccount &&
                  (<button className='border-[2px] bg-[#933709] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#b8450b]' type="button" onClick={() => handleClick(0)}>
                      Marketplace
                  </button>
                  )}
                  {connectedAccount &&
                  (<button className='border-[2px] bg-[#933709] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#b8450b]' type="button" onClick={() => handleClick(2)}>
                      Exchange
                  </button>
                  )}
                  <button className='border-[2px] bg-[#933709] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#b8450b]' type="button"  onClick={() => handleClick(1)}>
                      Home
                  </button>
                  {connectedAccount &&
                  (<button className='border-[2px] bg-[#933709] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#b8450b]' type="button" onClick={() => handleClick(3)}>
                      Claim
                  </button>
                  )}
                  <button className='border-[2px] bg-[#933709] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#b8450b]' type="button" onClick={() => handleClick(4)}>
                      Purchased
                  </button>
              </ul>
          </nav>,
          {renderedComponent}
      </div>
    </div>
  )
}

export default App
