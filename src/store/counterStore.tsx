import create from "zustand";
import {getEthereumContract, toastMessage} from "../helper/utils";

declare const ethereum: any;


export const useCounter = create((set: any, get: any) => ({
    counter: 0,
    loading: false,

    getCounter: () => set(async () => {
        set({loading: true});
        try {

            if (ethereum) {
                const transactionContract = getEthereumContract();

                const currentCounterTest = await transactionContract.getCounter();

                set({counter: currentCounterTest.toNumber()})
            }

        } catch (e) {
            console.log(e);
        }
        set({loading: false});
    }),

    updateCounter: (decrease: boolean) => set(async (state: any) => {
        set({loading: true})
        try {
            if (!ethereum) return toastMessage('error', 'Please install metamask.');

            const transactionContract = getEthereumContract();
            let transactionHash: any;
            if (decrease) {
                transactionHash = await transactionContract.decreaseCounter();
            } else {
                transactionHash = await transactionContract.increaseCounter();
            }

            console.log(`Loading - ${ transactionHash.hash }`);
            await transactionHash.wait();

            console.log(`Success - ${ transactionHash.hash }`);

            state.getCounter()
        } catch (e) {
        }
        set({loading: false})
    }),
}));
