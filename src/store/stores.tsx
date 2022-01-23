import create from 'zustand';
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../helper/constants";
import {getEthereumContract, toastMessage} from "../helper/utils";

declare const ethereum: any;
declare const Swal: any;


export const useStore = create((set: any, get: any) => ({
    loading: false,
    currentAccount: '',

    checkIfWalletIsConnect: async () => set(async () => {
        try {
            if (!ethereum) {
                return alert('Please install MetaMask.');
            }

            const accounts = await ethereum.request({
                method: 'eth_accounts',
            });

            if (accounts.length) {
                set({ currentAccount: accounts[0] });
            } else {
                set({ currentAccount: '' });
                toastMessage('error', 'No Account found');
            }
        } catch (error: any) {
            toastMessage('error', error.message);
        }
    }),

    connectWallet: () => set(async () => {
        set({ loading: true });
        try {
            if (!ethereum) {
                return toastMessage('error', 'Please install MetaMask');
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            set({ currentAccount: accounts[0], loading: false })

            Swal.fire(
                'Successfully',
            )
        } catch (e) {
            console.log(e);
            set({ loading: false });
        }
    }),
}))
