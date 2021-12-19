import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';

export default (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    });
    const [errorMsg, setError] = useState(null);

    return (
        <div>
              <section className="form">
            <h1>Register</h1>
            <h5>Username:</h5>
            <input  className="input"  value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username: username
                })
            }}/>
            <h5>Password:</h5>
            <input  className="input"  value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }} type='password' />
            <button  id="log-register-btn"
                onClick={() => {

                    axios.post('/api/users/', userData)
                        .then(response => {
                            navigate("/jobSearch")
                            console.log(response)
                        })
                        .catch(
                        error => console.log(error))
                }}
            >Register</button>
              <p id="msg">
                    <b>{errorMsg}</b>
                </p>
          </section>
        </div>
    );
} 