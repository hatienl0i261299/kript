import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useStore} from "./store/stores";
import {Suspense, lazy} from 'react'
import Transactions from "./components/Transactions";
import Counter from "./components/Counter";
import Auction from "./components/Auction";
import Login from "./components/Login";
import {PREV_PATH} from "./helper/constants";

const AppRouter = () => {


    const {currentAccount} = useStore((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentAccount) {
            navigate('/login');
        } else {
            navigate(localStorage.getItem(PREV_PATH) || '');
        }
    }, [currentAccount]);


    return (
        <Routes>
            <Route index element={ <Transactions/> }/>
            <Route path={ '/counter' } element={ <Counter/> }/>

            <Route path={ '/auction' } element={ <Auction/> }/>

            <Route path={ '/login' } element={ <Login/> }/>
        </Routes>
    )
}

export default AppRouter;
