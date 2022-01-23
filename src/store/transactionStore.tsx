import create from "zustand";
import {getEthereumContract, toastMessage} from "../helper/utils";
import {ethers} from "ethers";

declare const ethereum: any;
declare const Swal: any;

export const useTransactionStore = create((set: any, get: any) => ({
    transactions: [],
    transactionCount: 0,
    loading: false,

    getAllTransactions: () => set(async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();

                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction: any) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));
                set({
                    transactions: structuredTransactions.reverse(),
                    transactionCount: structuredTransactions.length,
                })
            } else {
                toastMessage('error', 'Ethereum is not present');
            }
        } catch (error: any) {
            toastMessage('error', error.message);
        }
    }),

    // checkIfTransactionExists: () => set(async (state: any) => {
    //     set({ loading: true });
    //     try {
    //
    //         if (ethereum) {
    //             const transactionContract = getEthereumContract();
    //
    //             const currentTransactionCount = await transactionContract.getTransactionCount();
    //             // const currentCounterTest = await transactionContract.getCounterTest();
    //
    //             set({ transactionCount: currentTransactionCount.toNumber() })
    //             // setCounterTest(currentCounterTest.toNumber());
    //             set({ loading: false });
    //         }
    //
    //     } catch (e) {
    //         console.log(e);
    //         set({ loading: false });
    //     }
    // }),


    sendTransaction: (currentAccount: any, addressTo: any, amount: any, keyword: any, message: any) => set(async (state: any) => {
        try {
            if (!ethereum) return alert('Please install metamask.');
            const transactionContract = getEthereumContract();
            const parseAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    // gas: '0x5208', // 21000 GWEI
                    value: parseAmount._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);

            set({ loading: true });

            await transactionHash.wait();

            state.getAllTransactions();

            set({ loading: false });

            Swal.fire(
                'Successfully',
            )
        } catch (e: any) {
            toastMessage('error', e.message);
        }
    })

}));

