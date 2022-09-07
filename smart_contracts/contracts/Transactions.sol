// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Transactions {


    address ownerAddress = 0x7Ee351CFa389463dFf302c9F80F5B37f115f09C8;

    event Balance(uint amount);
    
    constructor () payable {

    }


    //Payed amount for every user

    mapping(uint => uint) moneySent;


    //Transfer money

    uint256 transactionCounter;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCounter += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }
    function getTransactionCount() public view returns(uint256) {
        return transactionCounter;
    }   




    //Buy products

    struct productBought{
        uint randomIdentifier;
        string shippingAddress;
        address buyerAddress;
        string productName;
        //bool status;
    }
    

    productBought[] arrayPurchased;
    uint lenght = 0;


    //See array of products 
    //-----------------------------------------------------------

    function searchInArray(uint _randomIdentifier) public view returns(productBought memory) {
        for(uint i = 0; i <= lenght; i++){
            if(_randomIdentifier == arrayPurchased[i].randomIdentifier){
                return(arrayPurchased[i]);
            }
        }
        return(arrayPurchased[0]);
    }

    function seeLenght() public view returns(uint) {
        return(lenght);
    }

    function seeArray() public view returns(productBought[] memory) {
        return(arrayPurchased);
    }

    //-----------------------------------------------------------


    function purchaseProduct(uint _randomIdentifier, string memory _shippingAddress, address _buyerAddress, string memory _productName, uint _price) public payable {
        productBought memory val = productBought(_randomIdentifier, _shippingAddress, _buyerAddress, _productName);
        arrayPurchased.push(val);
        lenght += 1;
        moneySent[_randomIdentifier] = ((_price/2));
    }

    function productArrived(uint _randomIdentifier, address payable _buyerAddress) public payable {
        bool isThere = false;
        for(uint i = 0; i < lenght; i++){
            if((keccak256(abi.encodePacked(_buyerAddress)) == keccak256(abi.encodePacked(arrayPurchased[i].buyerAddress))) && arrayPurchased[i].randomIdentifier == _randomIdentifier){
                delete arrayPurchased[i];
                isThere = true;
            }
        }
        if(isThere){
            _buyerAddress.transfer(moneySent[_randomIdentifier]);
            payable(ownerAddress).transfer((moneySent[_randomIdentifier]*3));
            moneySent[_randomIdentifier] = 0;
        }else{
            revert();
        }
    }

    function addToBlockchain(address payable receiver) public payable {
        receiver.transfer(msg.value);
    }

    function balance() external view returns (uint) {
        uint amount = address(this).balance;
        return amount;
    }

    function seeMoney(uint _randomIdentifier) public view returns(uint){
        return(moneySent[_randomIdentifier]);
    }


    //-----------------------------------------------------------

    function contractAddress() public view returns(address) {
        return (address(this));
    }
     
}