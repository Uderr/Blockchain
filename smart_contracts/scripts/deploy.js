const main = async () => {

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

const runMain = async () => { 
  try{
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();

//0x1FaA6D8004C16786dc04698ca4F6A55FA37ddBCB