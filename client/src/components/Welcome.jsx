import React, {useContext, useState} from "react";
import { transactionContext } from "../context/transactionContext";




const Welcome = () => {

    const {connectWallet, connectedAccount} = useContext(transactionContext);

    const handleSubmit = (e) => {
        connectWallet();
    }


    return (
        <div className="h-screen w-screen h- w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    <h1 className="text-3xl sm:text-5xl text-white py-1">
                        Buy real italian Moka with cryptocurrencies! <br />
                    </h1>
                    {!connectedAccount && (
                        <>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="border-[2px] flex text-white text-semibold flex-row justify-center items-center my-5 bg-[#933709] p-3 rounded-full cursor-pointer hover:bg-[#b8450b]">
                            Connect your wallet
                        </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Welcome;