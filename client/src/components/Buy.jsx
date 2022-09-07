import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import '../index.css'
import '../Style.css'


import Card from "./Card";

import React, {useContext} from "react";

const Buy = () => {


    const products = [
        {id: 1, url: '../../images/medium.png', name: 'Medium size moka', deescription: 'Coffe for 3', price: '0.00003'},
        {id: 1, url: '../../images/little.png', name: 'Little size moka', deescription: 'Coffe for 1', price: '0.00001'},
        {id: 1, url: '../../images/big.png', name: 'Big size moka', deescription: 'Coffe for 4/5', price: '0.00005'},
    ]
    
    return (
        <>
        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
            <h2 className="text-1xl sm:text-3xl text-white py-1 justify-center">
                Remember: you will pay double the price, the money will be returned once your product arrives! <br />
            </h2>
            <div className="flex w-full justify-center items-center wrapper">
                {products.map((product) => (
                    <>
                    <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4"> 
                        <Card img={product.url} title = {product.name} description = {product.deescription} price = {product.price}/>
                    </div>
                    </>
                ))}
            </div>
        </div>
        </>
    );
}

export default Buy;