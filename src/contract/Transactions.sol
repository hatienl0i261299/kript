//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Auction {

    uint public auctionCounter = 0;

    struct AuctionStruct {
        uint auctionID;
        address highestBid;
        address owner;
        uint amount;
        string image;
        string info;
        uint endTime;
        bool isEnded;
    }

    mapping(uint => AuctionStruct) public auctions;

    error AuctionAlreadyEnded();
    error BidNotHighEnough(uint highestBid);

    event transferEvent(address highestBid, address owner, uint amount, string image, string info, uint endTime);

    function Bid(uint auctionID, uint amount) public payable {
        if (auctions[auctionID].endTime < block.timestamp) {
            revert AuctionAlreadyEnded();
        } else if (auctions[auctionID].amount > amount) {
            revert BidNotHighEnough(amount);
        }

        auctions[auctionID].highestBid = msg.sender;
        auctions[auctionID].amount = amount;
    }

    function addNewAuction(uint amount, string memory image, string memory info, uint endTime) public payable {
        auctionCounter++;
        auctions[auctionCounter] = AuctionStruct(auctionCounter, msg.sender, msg.sender, amount, image, info, endTime + block.timestamp, false);
    }

    function transfer(uint auctionID) public payable {
        auctions[auctionID].isEnded = true;
        emit transferEvent(
            auctions[auctionID].highestBid,
            auctions[auctionID].owner,
            auctions[auctionID].amount,
            auctions[auctionID].image,
            auctions[auctionID].info,
            auctions[auctionID].endTime
        );
    }
}