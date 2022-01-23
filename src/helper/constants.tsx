import transactionInfo from '../abis/Transactions.json';
import auctionInfo from '../abis/Auction.json';

export const contractABI = transactionInfo.output.abi;
export const contractAddress = '0x00D54481498C01f1a4236Fe6a9C91e5402aF01A2';
export const PREV_PATH = 'PREV_PATH';

export const auctionAddress = '0x7b7da4BAACE398236Ab331546cDDAa25E5368979';
export const auctionABI = auctionInfo.output.abi;