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

    const {formDataClaim, handleChangeClaim, productArrived} = useContext(transactionContext);

    const handleSubmit = () => {
        const {randomId} = formDataClaim;

        if(!randomId) return;

        productArrived(randomId);

    }
    

    return(
        <div className="flex flex-col h-screen flex-1 items-center justify-start w-full md:mt-0 mt-10">
            <h2 className="text-3xl sm:text-5xl text-white py-1 justify-center">
                Is your product arrived? Send a confirmation! <br />
                <br></br>
            </h2>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="Random identifier" name="randomId" type="number" handleChange={handleChangeClaim}/>
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