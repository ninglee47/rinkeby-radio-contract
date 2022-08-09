//PDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract RadioStations {
    address public owner;

    uint256 totalSongs;

    event NewSong(address indexed from, uint256 timestamp, string station ,string name, string link ,string message);
    event NewStation(uint256 timestamp, string station);

    struct Station {
        string station;
        uint256 timestamp;
    }
    Station[] stations;

    struct Song {
        address waver;
        string station;
        string name;
        string link;
        string message;
        uint256 timestamp;
    }
    Song[] songs;

    constructor () payable {
        console.log("A contract");
        owner = msg.sender;
    }

    // Modifier to check that the caller is the owner of
    // the contract.
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    function createStation(string memory _station) public onlyOwner {
        console.log("%s has created a station", msg.sender);
        stations.push(Station(_station, block.timestamp));
    }

    function postSong(string memory _station, string memory _name, string memory _link, string memory _message) public {

        totalSongs += 1;
        console.log("%s has posted a song", msg.sender);

        songs.push(Song(msg.sender, _station, _name, _link, _message, block.timestamp));

        emit NewSong(msg.sender, block.timestamp, _station, _name, _link, _message);
    }

    function getAllStations() public view returns (Station[] memory) {
        return stations;
    }

    function getAllSongs() public view returns (Song[] memory) {
        return songs;
    }

    function getTotalSongs() public view returns (uint256) {
        console.log("Total songs:%d", totalSongs);
        return totalSongs;
    }
}