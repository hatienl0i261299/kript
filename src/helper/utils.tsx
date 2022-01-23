import {ethers} from "ethers";
import {auctionABI, auctionAddress, contractABI, contractAddress} from "./constants";
declare const ethereum: any;
declare const Swal: any;

export const shortenAddress = (address: any) => {
    const len = address.length;
    return `${ address.slice(0, Math.floor(len/4)) }...${ address.slice(address.length - Math.floor(len/4)) }`;
};


export const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
};

export const getAuctionContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(auctionAddress, auctionABI, signer);
};


export const toastMessage = (status: any, title: any) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: status,
        title: title,
    })
}