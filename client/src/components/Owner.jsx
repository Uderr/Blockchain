import React, {useContext, useEffect} from "react";
import { transactionContext } from "../context/transactionContext";


import CardPurchase from "./CardPurchase";

const Owner = () => {

    const {arrayProduct, seeArrayProducts, arrayLenght} = useContext(transactionContext);


    const products = [
    ]


    const checkArrayLenght = () => {
        seeArrayProducts();
    }

    const check = () => {

        console.log(arrayLenght);
        console.log(arrayProduct);
    
    }

    const fill = () => {
        for(var i = 0; i < arrayLenght; i++){
            if(arrayProduct[i].randomIdentifier != 0){
                products.push({id: arrayProduct[i].randomIdentifier.toNumber(), name: arrayProduct[i].productName.toString(), shipAdd: arrayProduct[i].shippingAddress.toString(), buyer: arrayProduct[i].buyerAddress.toString()});
            }
        }
    }
    


    useEffect(() => {
        checkArrayLenght();
    }, []);

    if((arrayLenght != 0) && (arrayProduct)){
        check();
        fill();
    }

    

    return(

            <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                <div className="flex w-full justify-center items-center wrapper">
                {products.map((product) => (
                    <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4"> 
                        <CardPurchase title = {product.id} shipAdd = {product.shipAdd} buyer = {product.buyer} name = {product.name}/>
                    </div>
                ))}                
                </div>
            </div>
    )
}

export default Owner;