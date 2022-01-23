import {useEffect, useState} from "react";
import {useStore} from "../store/stores";
import styled from "styled-components";
import {shortenAddress} from "../helper/utils";
import {useTransactionStore} from "../store/transactionStore";


const Transactions = () => {

    const {
        transactions,
        transactionCount,
        loading,

        sendTransaction,
        getAllTransactions
    } = useTransactionStore((state: any) => state);

    const {
        currentAccount
    } = useStore((state: any) => state);

    useEffect(() => {
        if (currentAccount) {
            getAllTransactions();
        }
    }, [currentAccount])

    const [formData, setFormData] = useState<any>({
        addressTo: '',
        amount: '',
        keyword: '',
        message: '',
    });

    const handleChange = (event: any, type: string) => {
        setFormData((prevState: any) => ({...prevState, [type]: event.target.value}));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const {addressTo, amount, keyword, message} = formData;

        if (!addressTo || !amount || !keyword || !message) return;

        await sendTransaction(currentAccount, addressTo, amount, keyword, message);
    }


    return (
        <>
            <div className={ 'col-6' }>
                <form>
                    <div className="mb-3">
                        <label htmlFor="addressTo" className="form-label">Address To</label>
                        <input
                            type="text"
                            id="addressTo"
                            className="form-control"
                            placeholder="Address To"
                            value={ formData.addressTo }
                            onChange={ (e) => handleChange(e, 'addressTo') }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount (ETH)</label>
                        <input
                            type="number"
                            id="amount"
                            className="form-control"
                            placeholder="Amount (ETH)"
                            value={ formData.amount }
                            onChange={ (e) => handleChange(e, 'amount') }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="keyword" className="form-label">Keyword (GIF)</label>
                        <input
                            type="text"
                            id="keyword"
                            className="form-control"
                            placeholder="Keyword (GIF)"
                            value={ formData.keyword }
                            onChange={ (e) => handleChange(e, 'keyword') }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="enterMessage" className="form-label">Enter Message</label>
                        <input
                            type="text"
                            id="enterMessage"
                            className="form-control"
                            placeholder="Enter Message"
                            value={ formData.message }
                            onChange={ (e) => handleChange(e, 'message') }
                        />
                    </div>
                    { !loading ? <div className="col-lg-2 offset-lg-5 btn-group" role={ 'group' }>
                        <button
                            type="button"
                            className="btn btn-block btn-outline-success"
                            onClick={ (e) => handleSubmit(e) }
                        >
                            Send
                        </button>
                    </div> : <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> }
                </form>
            </div>
            <WrapTransactions className={ 'col-6' }>
                { transactions.length !== 0 && <div className={ 'row' }>
                    <h3>All Transactions ({ transactionCount })</h3>
                    { transactions.map((transaction: any, index: any) => {
                        return (<div className="card border-dark mb-3" key={ index }>
                            <div className="card-header">
                                <Address
                                    // onClick={ () => window.open(`https://ropsten.etherscan.io/address/${ transaction.addressFrom }`, '_blank') }
                                >
                                    From: { shortenAddress(transaction.addressFrom) }
                                </Address>
                            </div>
                            <div className="card-body text-dark">
                                <h6 className="card-title">
                                    <Address
                                        // onClick={ () => window.open(`https://ropsten.etherscan.io/address/${ transaction.addressTo }`, '_blank') }
                                    >
                                        AddressTo: { transaction.addressTo }
                                    </Address>
                                </h6>
                                <div className="card-text">
                                    <ul>
                                        <li>Timestamp: { transaction.timestamp }</li>
                                        <li>Message: { transaction.message }</li>
                                        <li>Amount: { transaction.amount }</li>
                                        <li>Keyword: { transaction.keyword }</li>
                                    </ul>
                                </div>
                            </div>
                        </div>)
                    }) }
                    <hr/>
                </div> }
            </WrapTransactions>
        </>
    )
}

const Address = styled.div`
    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`;

const WrapTransactions = styled.div`
    height: 33em;
    overflow: auto;
`;

export default Transactions;
