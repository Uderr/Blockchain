import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import React, {useContext} from "react";
import { transactionContext } from "../context/transactionContext";
import { Loader } from './';


const Input = ({placeholder, name, type, value, handleChange}) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm blue-glassmorphism"
    ></input>
);


const Exchange = () => {

    const {formData, sendTransaction, handleChange} = useContext(transactionContext);

    const handleSubmit = (e) => {
        const {addressTo, amount, keywordName, message } = formData;
        
        e.preventDefault();

        if(!addressTo || !amount || !keywordName || !message) return;

        console.log(formData);

        sendTransaction();

    }

    return(
        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
            <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
                <div className="flex justify-between flex-col w-full h-full">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                            <SiEthereum fontSize={21} color="#fff"> </SiEthereum>
                        </div>
                        <BsInfoCircle fontSize={17} color="#fff"></BsInfoCircle>
                    </div>
                    <div>
                        <p className="text-white font-light text-sm">
                            Address
                        </p>
                        <p className="text-white font-semibold text-lg mt-1">
                            Ethereum
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                <Input placeholder="Keyword (Gif)" name="keywordName" type="text" handleChange={handleChange}/>
                <Input placeholder="Enter message" name="message" type="text" handleChange={handleChange}/>
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                    {false ? (
                        <Loader />
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-[#933709] text-white w-full mt-2 border-[2px] p-2 rounded-full cursor-pointer">
                            Send now
                        </button>
                    )}
            </div>
            

        <br></br>
        </div>
    )
}

export default Exchange;