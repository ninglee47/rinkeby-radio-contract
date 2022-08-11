const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const radioContractFactory = await hre.ethers.getContractFactory("RadioStations");
    const radioContract = await radioContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await radioContract.deployed();
    console.log("Dapp address: ", radioContract.address);
    console.log("Deployed by:", deployer.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1);// exit Node process while indicating 'Uncaught Fatal Exception' error
    }
}

runMain();