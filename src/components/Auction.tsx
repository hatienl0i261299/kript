import {useEffect, useState} from "react";
import {useStore} from "../store/stores";
import useAuctionStore from "../store/auctionStore";

const Auction = () => {

    const {
        getAllAuction,
        auctions,
        auctionCounter,
        bid,
        endBid,
        loading,
        addNewAuction,
    } = useAuctionStore((state) => state);

    const [amounts, setAmounts] = useState<any>({});

    const {currentAccount} = useStore((state) => state);
    const [formData, setFormData] = useState<any>({
        image: '',
        info: '',
        amount: '',
        endTime: '',
    });

    useEffect(() => {
        if (currentAccount) {
            getAllAuction();
        }
    }, [currentAccount]);

    const handleChange = (event: any, type: string) => {
        setFormData((prevState: any) => ({...prevState, [type]: event.target.value}));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const {image, info, amount, endTime} = formData;

        await addNewAuction(image, info, amount, endTime);
    }

    const showDateTime = (timestamp: any) => {
        const date = new Date(timestamp * 1000);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    return (
        <>
            <div className={ 'col-6' }>
                <form>
                    <div className="mb-3">
                        <label htmlFor="Image" className="form-label">Image</label>
                        <input
                            type="text"
                            id="Image"
                            className="form-control"
                            placeholder="Image"
                            value={ formData.image }
                            onChange={ (e) => handleChange(e, 'image') }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="info" className="form-label">Info</label>
                        <input
                            type="text"
                            id="info"
                            className="form-control"
                            placeholder="Info"
                            value={ formData.info }
                            onChange={ (e) => handleChange(e, 'info') }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount (ETH)</label>
                        <input
                            type="text"
                            id="amount"
                            className="form-control"
                            placeholder="Amount (ETH)"
                            value={ formData.amount }
                            onChange={ (e) => handleChange(e, 'amount') }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endTime" className="form-label">End Time</label>
                        <input
                            type="text"
                            id="endTime"
                            className="form-control"
                            placeholder="End Time"
                            value={ formData.endTime }
                            onChange={ (e) => handleChange(e, 'endTime') }
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
            <div className={ 'col-6' }>
                Auction Counter: { auctionCounter }
                { auctions.length !== 0 && auctions.map((val: any) => {
                    return <ul key={ val.auctionID.toNumber() }>
                        <li>Highest: { val.highestBid }</li>
                        <li>Owner: { val.owner }</li>
                        <li>Amount: { val.amount.toNumber() }</li>
                        <li>Image: { val.image }</li>
                        <li>Info: { val.info }</li>
                        <li>End Time: { showDateTime(val.endTime.toNumber()) }</li>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Amount"
                                aria-label="Amount"
                                value={ amounts[`amount${ val.auctionID.toNumber() }`] || '' }
                                aria-describedby={ `amount${ val.auctionID.toNumber() }` }
                                onChange={ (e) => {
                                    const value = e.target.value;
                                    const tmpAmounts = {...amounts};
                                    tmpAmounts[`amount${ val.auctionID.toNumber() }`] = value;
                                    setAmounts(tmpAmounts);
                                } }
                            />
                            <div className={ 'btn-group' }>
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    id={ `amount${ val.auctionID.toNumber() }1` }
                                    onClick={ () => {
                                        bid(val, amounts[`amount${ val.auctionID.toNumber() }`])
                                    } }
                                >
                                    Bid
                                </button>
                                { currentAccount.toLowerCase() === val.highestBid.toLowerCase() && <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    id={ `amount${ val.auctionID.toNumber() }2` }
                                    onClick={ () => {
                                        endBid(val)
                                    } }
                                >
                                    End
                                </button> }
                            </div>
                        </div>
                    </ul>
                }) }
            </div>
        </>
    )
}

export default Auction;
