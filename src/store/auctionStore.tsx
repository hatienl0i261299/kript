import create from "zustand";
import {getAuctionContract, getEthereumContract} from "../helper/utils";
import {ethers} from "ethers";

declare const ethereum: any;

const useAuctionStore = create((set: any, get: any) => ({
    auctions: [],
    auctionCounter: 0,
    loading: false,

    getAllAuction: () => set(async (state: any) => {
        set({loading: true});
        try {

            if (ethereum) {

                let auctions = [];

                const auctionContract = getAuctionContract();

                const auctionCounter = await auctionContract.auctionCounter();

                for (let i = 1; i <= auctionCounter; i++) {
                    const auction = await auctionContract.auctions(i)
                    !auction.isEnded && auctions.push(auction);
                }

                set({auctionCounter: auctionCounter.toNumber(), auctions: auctions})
            }

        } catch (e) {
            console.log(e);
        }
        set({loading: false});
    }),

    bid: (auctionInfo: any, amount: any) => set( async (state: any) => {
        set({loading: true});
        try {
            if (ethereum) {

                const auctionContract = getAuctionContract();

                const auctionHash = await auctionContract.Bid(auctionInfo.auctionID, amount);

                await auctionHash.wait();

                state.getAllAuction();

            }
        } catch (error: any) {
            console.log(error);
        }
        set({loading: false});
    }),

    endBid: (auctionInfo: any) => set(async (state: any) => {
        set({loading: true});
        try {
            if (ethereum) {
                const auctionContract = getAuctionContract();

                const parseAmount = ethers.utils.parseEther(auctionInfo.amount.toString());

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: auctionInfo.highestBid,
                        to: auctionInfo.owner,
                        value: parseAmount._hex
                    }]
                });

                const auctionHash = await auctionContract.transfer(auctionInfo.auctionID);

                await auctionHash.wait();

                state.getAllAuction();

            }
        } catch (error: any) {
            console.log(error);
        }
        set({loading: false});
    }),

    addNewAuction: (image: any, info: any, amount: any, endTime: any) => set(async (state: any) => {
        set({loading: true});
        try {
            if (ethereum) {
                const auctionContract = getAuctionContract();

                const auctionHash = await auctionContract.addNewAuction(amount, image, info, endTime);

                await auctionHash.wait();

                state.getAllAuction();
            }
        } catch (error: any) {
            console.log(error);
        }
        set({loading: false});
    })
}))

export default useAuctionStore;