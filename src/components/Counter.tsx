import {useCounter} from "../store/counterStore";
import {useEffect} from "react";
import {useStore} from "../store/stores";


const Counter = () => {

    const {
        updateCounter,
        loading,
        counter,
        getCounter
    } = useCounter((state) => state);

    const {currentAccount} = useStore((state) => state);

    useEffect(() => {
        if (currentAccount) {
            getCounter();
        }
    }, [currentAccount])

    return (
        <>
            <div className={ 'col-lg-12 pt-5' }>
                <div className="alert alert-primary" role="alert">
                    Counter: { counter }
                </div>
                <div className={ 'row col-lg-6 offset-lg-3' }>
                    <div className={ 'btn-group' }>
                        { !loading ? <>
                            <button
                                type="button"
                                className="btn btn-block btn-outline-success"
                                onClick={ () => updateCounter(false) }
                            >
                                Increase CounterTest
                            </button>
                                <button
                                    type="button"
                                    className="btn btn-block btn-outline-success"
                                    onClick={ () => updateCounter(true) }
                                >
                                    Decrease CounterTest
                                </button>
                            </> : <div className="d-flex text-center mx-auto my-auto">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Counter;
