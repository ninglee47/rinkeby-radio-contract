const main = async () => {
    
    const radioStationContractFactory = await hre.ethers.getContractFactory("RadioStations");
    const radioStationContract = await radioStationContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.01"),
    });
    await radioStationContract.deployed();
    console.log("Deployed to:", radioStationContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(radioStationContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    let songCount;
    songCount = await radioStationContract.getTotalSongs();
    console.log(songCount.toNumber());

    const songTxn = await radioStationContract.postSong("Hard Time", "Ning", "https://open.spotify.com/track/5DebUsH4CN4ByTe0xF0KPJ", "This is song #1");
    await songTxn.wait();

    const songTxn2 = await radioStationContract.postSong("Hard Time", "Ning", "https://open.spotify.com/track/5DebUsH4CN4ByTe0xF0KPJ", "This is song #2");
    await songTxn2.wait();
 
    //const [owner, randomPerson] = await hre.ethers.getSigners();
    //console.log("randomPerson", randomPerson)
    
    const stationTxn = await radioStationContract.createStation("Hard Time");
    //const stationTxn2 = await radioStationContract.connect(randomPerson).createStation("Hard Time");

    let allSongs = await radioStationContract.getAllSongs();
    console.log(allSongs);

    let allStations = await radioStationContract.getAllStations();
    console.log(allStations);
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