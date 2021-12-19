import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import "./style/LoginRegister.css";

export default (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })
    const [errorMsg, setError] = useState(null);
    const [loggedInName, setLoggedInName] = useState('');

    return (
        <div>
            <section className="form">
                <h1>Login</h1>
                <h5>Username: </h5>
                <input className="input" value={userData.username} onChange={(e) => {
                    const username = e.target.value;
                    setUserData({
                        ...userData,
                        username: username
                    })
                }} />
                <h5>Password: </h5>
                <input className="input" value={userData.password} onChange={(e) => {
                    const password = e.target.value;
                    setUserData({
                        ...userData,
                        password: password
                    })
                }} type='password' />
                <button id="log-register-btn"
                    onClick={() => {
                        if (!(userData.password && userData.username)) {
                            setError("You must fill all field!");
                            return;
                        }
                        axios.post('/api/users/authenticate', userData)
                            .then(response => {
                                dispatch({ type: 'LOGGED_IN', username: response.data });
                                navigate("/jobSearch")
                                console.log(response)
                            })
                            .catch(error => console.log(error));
                    }}
                >Login</button>
                <p id="msg">
                    <b>{errorMsg}</b>
                </p>
            </section>
        </div >
    );
}