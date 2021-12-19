import React from 'react';
import { NavLink } from 'react-router-dom'
import { ReactComponent as Home } from './logos/home.svg';
import { ReactComponent as JobSearchLogo } from './logos/search-logo.svg';
import { useNavigate } from "react-router-dom";
import "./style/NavBar.css";
import { ReactComponent as Favoriate } from "./logos/favoriate.svg";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";


export default function NavBar() {
    const navigate = useNavigate();
    const username = useSelector(state => state.username);
    const dispatch = useDispatch();

    function logoutOnclick() {
        return axios.post('/api/users/logout')
            .then(() => {
                dispatch({ type: 'LOGGED_IN', username: null });
                navigate('/');
            })
            .catch(console.error)
            ;
    }

    return (
        <nav>
            <div className='div-header'>
                <div className='div-svg-search'>
                    <JobSearchLogo />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <NavLink exact to='/' ><Home className='div-svg' /></NavLink>
                    {username && <Link to={"/myFavorite/" + username}>
                        <Favoriate className="div-svg" />
                    </Link>}
                    <Dropdown>
                        <Dropdown.Toggle split variant="success" id="dropdown-basic">
                            {username}
                        </Dropdown.Toggle >
                    </Dropdown>
                    {username &&
                        <Link to={"/addJob"}>
                            <button className="button-header">
                                <b>Add Job</b>
                            </button>
                        </Link>
                    }
                    {!username && <Link to={"/login"}>
                        <button className='button-header' ><b>Log in</b></button></Link>}
                    <div className="divider" />
                    {!username && <Link to={"/register"}>
                        <button className='button-header' ><b>Register</b></button></Link>}

                    {username && <button className="button-header" onClick={logoutOnclick}>
                        <b>Log Out</b>
                    </button>}

                </div>
            </div>
        </nav>
    )
}