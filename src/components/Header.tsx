import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useStore} from "../store/stores";
import {shortenAddress} from "../helper/utils";
import styled from "styled-components";
import {PREV_PATH} from "../helper/constants";

const MENU = [
    {
        name: 'Transaction',
        active: false,
        path: '/'
    },
    {
        name: 'Counter',
        active: false,
        path: '/counter'
    },
    {
        name: 'Auction',
        active: false,
        path: '/auction',
    }
]

const Header = () => {

    const [menu, setMenu] = useState(MENU);
    let navigate = useNavigate();
    const {
        currentAccount,
        checkIfWalletIsConnect,
    } = useStore((state) => state);

    const location = useLocation();

    useEffect(() => {
        checkIfWalletIsConnect();
        const tmMenu = [...MENU];
        tmMenu.map((v: any, i: any) => {
            v.active = v.path === location.pathname;
        })
        setMenu(tmMenu);
    }, [currentAccount, location.pathname]);

    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <img src={'/src/favicon.svg'} alt={''} style={{ width: '35px' }}/>
                <span className="fs-4">{shortenAddress(currentAccount)}</span>
            </Link>

            <ul className="nav nav-pills">
                {menu.map((val: any, idx: any) => {
                    return <li className="nav-item" key={val.name + idx}>
                        <HeaderItem
                            className={`nav-link ${val.active ? 'active' : ''}`}
                            onClick={() => {
                                const tmMenu = [...MENU];
                                tmMenu.map((v: any, i: any) => {
                                    v.active = i === idx;
                                })
                                setMenu(tmMenu);
                                localStorage.setItem(PREV_PATH, val.path);
                                navigate(val.path);
                            }}
                        >{val.name}</HeaderItem>
                    </li>
                })}
            </ul>
        </header>
    )
}

const HeaderItem = styled.a`
    cursor: pointer;
`

export default Header;