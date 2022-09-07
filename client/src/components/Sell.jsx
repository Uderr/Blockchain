import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import axios from 'axios'; 

import React, {useContext} from "react";
import Card from "./Card";


const Input = ({placeholder, type, value, onChange}) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        onChange={onChange}
    ></input>
);

const Sell = () => {

    state = {
        selectedFile: null
    }

    const fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        axios.post('')

    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Title" type="text" />
                        <Input placeholder="Price (ETH)" type="number" />
                        <Input placeholder="Description" type="text" />
                        <br></br>
                        <p className="text-white">Upload image</p>
                        <div className="p-4 w-full flex flex-col justify-start items-center blue-glassmorphism">
                            <Input placeholder="Upload Image" type="file" onChange={fileSelectedHandler} />
                            <button
                                type="button"
                                onClick={this.fileUploadHandler}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                                Upload
                            </button>
                        </div>
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                            {false ? (
                                <Loader />
                            ) : (
                                <button
                                    type="button"
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                                    Sell the product
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sell;