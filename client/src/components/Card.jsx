import '../index.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import '../Style.css'


import React, {useContext, useEffect, useState} from "react";
import { transactionContext } from "../context/transactionContext";

import { Loader } from './';


const Input = ({placeholder, value, handleChange}) => (
    <input
        placeholder={placeholder}
        type="text"
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm blue-glassmorphism"
    ></input>
);


const Card = (props) => {

    const [value, setValue] = useState();
    
    const handleChange = (e) => {
        setValue(() => (e.target.value));
    }


    const {handleSubmitPurchase, setIsLoading, connectedAccount, buyProduct} = useContext(transactionContext);

    const handleSubmit = async (e) => {

        console.log("2 volte?");

        if(!value){
            alert("Insert your shipping address before!");
        }else{
                
            e.preventDefault();
            const randomIdentifier = Math.floor(Math.random() * 1000001);
            buyProduct(randomIdentifier, value, connectedAccount, props.title, props.price);
        }
    }

    return(
        <div className='card text-center'>
            <div className='overflow'>
                <img src= {props.img} className='card__image'/>
            </div>
            <div className='card-boy text-dark'>
                <h4 className='card-title'> {props.title} </h4>
                <p className='card-text text-secondary'> {props.description} </p>
            </div>
            <br></br>
            <p className="flex-col font-bold text-black text-base">
                    Insert your shipping address!
            </p>
            <Input placeholder="Address" name="address" type="text" handleChange={handleChange}/>
            <p className='border-[2px] hover:bg-[#e6560e] rounded-full font-bold'> Price (ETH): {props.price} </p>
            <div className='justify-center items-center flex'>
                {setIsLoading ? (
                    <Loader />
                ) : (
                    <button className='bg-[#933709] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#e6560e] text-white bottom-0' type="button" onClick={handleSubmit}> Buy </button>
                )}
            </div>
        </div>
    )
}

export default Card;