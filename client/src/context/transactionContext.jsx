import React, {useEffect, useState, setState} from "react";
import {ethers} from 'ethers';
import {contractABI, contractAddress} from "../utils/constants";


export const transactionContext = React.createContext();



const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}
export const TransactionProvider = ({children}) => {

    const transactionContract = getEthereumContract();

    const [connectedAccount, setCurrentAccount] = useState("");
    
    
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [formDataPurchase, setFormDataPurchase] = useState({ randomId: '', shippingAddress: '', buyersAddress: '', productName: '', price: ''});
    const [formDataClaim, setFormDataClaim] = useState({randomId: '', metaAdd: ''});
    
    const [isLoading, setIsloading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    var preventDouble;

    const [arrayLenght, setArrayLenght] = useState(0);
    const [arrayProduct, setArrayProduct] = useState();

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const handleChangeClaim = (e1) => {
        setFormDataClaim(() => ({randomId: e1}));
    }

    const handleSubmitPurchase = (e1, e2, e3, e4, e5) => {
        setFormDataPurchase(() => ({randomId: e1, shippingAddress: e2, buyersAddress: e3, productName: e4, price: e5}));
        preventDouble = e1;
        buyProduct();
    }

    const checkWallet = async () => {
        try {
            if(!ethereum) return alert("Install metamask!");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts.lenght);
            
            if(accounts[0]) {
                setCurrentAccount(accounts[0]);
            }else{
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            console.log(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }


    }


    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Install metamask");
            const {addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
        
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208',
                    gasLimit: 500000,
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsloading(true);
            console.log(transactionHash.hash);
            await transactionHash.wait();

            setIsloading(false);
            console.log("Success");

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            
        }
    }


    const buyProduct = async (e1, e2, e3, e4, e5) => {
        console.log("ci");
        try {
            if(!ethereum) return alert("Install metamask");
            const randomId = e1;
            const shippingAddress = e2;
            const buyersAddress = e3;
            const productName = e4;
            const price = e5;

            const addressContract = transactionContract.address;
            console.log(addressContract);
            console.log(randomId);

            const realPrice = (price*2).toString();
            const _price = (price * (10**18));

            const saveMemo = await transactionContract.purchaseProduct(randomId, shippingAddress, buyersAddress, productName, _price, {value: ethers.utils.parseUnits(realPrice, "ether"), gasLimit: 210000});
            setIsloading(true);
            await saveMemo.wait();

            setIsloading(false);
            console.log("Success");

            window.location.reload();

            /*

            const transactionHash = await transactionContract.purchaseProduct(randomId, shippingAddress, buyersAddress, productName);
            
            setIsloading(true);
            console.log("helo");
            console.log(transactionHash.hash);
            await transactionHash.wait();

            setIsloading(false);
            console.log("Success");

            const balance = await transactionContract.balance();
            console.log(balance);
            */


            
        } catch (error) {
            console.log(error);
            
        }
    }

    const seeArrayProducts = async () => {
        try {
            console.log("called once");
            const seeArrayLenght = await transactionContract.seeLenght();
            console.log(seeArrayLenght.toNumber());
            setArrayLenght(seeArrayLenght.toNumber());

            const seeArray = await transactionContract.seeArray();
            setArrayProduct(seeArray);

            await seeArray.wait();
            
        } catch (error) {
            
        }
    }
    


    const productArrived = async (e1) => {
        try {
            const randomId = e1.target.value;
            console.log(randomId);
            console.log(connectedAccount);

            const productArrived = await transactionContract.productArrived(randomId, connectedAccount, {value: ethers.utils.parseEther("0"), gasLimit: 210000});
            setIsloading(true);
            await productArrived.wait();
            setIsloading(false);
            console.log("eccoci");
            window.location.reload();

        } catch (error) {
            console.log(error);
            alert("An error occured: verify that you have sent the right identifier!");
        }
    }



    useEffect(() => {
        checkWallet();
    }, []);


    return (
        <transactionContext.Provider value={{connectWallet, connectedAccount, formData, formDataPurchase, setFormData, setFormDataPurchase, handleChange, handleSubmitPurchase, sendTransaction, buyProduct, setIsloading, seeArrayProducts, arrayLenght, arrayProduct, productArrived, handleChangeClaim, formDataClaim}}>
            {children}
        </transactionContext.Provider>
    );
}