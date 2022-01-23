import {useStore} from "../store/stores";
import {useEffect} from "react";

const Login = () => {

    const {
        currentAccount,
        checkIfWalletIsConnect,
        connectWallet,
    } = useStore((state) => state);

    useEffect(() => {
        checkIfWalletIsConnect();
    }, [currentAccount]);

    return (
        <div className="row col-lg-6 offset-lg-3 text-center">
            <button
                type="submit"
                className="btn btn-primary"
                onClick={connectWallet}
            >
                Connect to MetaMask
            </button>
        </div>
    )
}

export default Login;
