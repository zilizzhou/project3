import "./style/LoginRegister.css";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
const { v4: uuid } = require('uuid');

export default function AddJob(props) {
    const navigate = useNavigate();
    const username = useSelector(state => state.username);
    const [errorMsg, setError] = useState(null);
    const [jobForm, setJobForm] = useState({
        id: uuid(),
        title: '',
        location: '',
        companyName: '',
        description: '',
        employerEmail: '',
        companyLink: null,
        postdate: new Date().toISOString().split("T")[0],
        owner: username,
    });

    const [myJob, setMyJob] = useState([])

    function createForm() {
        if (!jobForm) {
            setError("Please fill out the form.");
            return;
        }
    }

    function getMyJob() {
        axios.get('/api/jobs/findAll')
            .then(response => setMyJob(response.data))
            .catch(error => console.log(error));
    }


    function checkLogin() {
        if (!username) {
            navigate('/login')
        } else {
            return;
        }
    }

    useEffect(checkLogin, []);
    useEffect(getMyJob, []);

    function onSubmitAddJobButtonClick() {
        if (
            !(
                jobForm.title &&
                jobForm.location &&
                jobForm.companyName &&
                jobForm.description &&
                jobForm.employerEmail
            )
        ) {
            setError("You must fill all the fields except company link");
            return;
        }

        axios
            .post("/api/jobs/create", jobForm)
            .then((response) => {
                getMyJob();
                navigate("/job/" + jobForm.id);
                console.log(response);
            })
            .catch((error) => console.error(error));
    }

    return (
        <section className="job-container">

            <div>
                <h5>Title:</h5>
                <input value={jobForm.title}
                    onChange={e => setJobForm({
                        ...jobForm,
                        title: e.target.value
                    })} ></input>
                <h5>Location:</h5>
                <input value={jobForm.location}
                    onChange={e => setJobForm({
                        ...jobForm,
                        location: e.target.value
                    })} ></input>
                <h5>Company Name:</h5>
                <input value={jobForm.companyName}
                    onChange={e => setJobForm({
                        ...jobForm,
                        companyName: e.target.value
                    })} ></input>

                <h5>Description:</h5>
                <textarea value={jobForm.description}
                    onChange={e => setJobForm({
                        ...jobForm,
                        description: e.target.value
                    })} ></textarea>

                <h5>EmployerEmail:</h5>
                <input value={jobForm.employerEmail}
                    onChange={e => setJobForm({
                        ...jobForm,
                        employerEmail: e.target.value
                    })} ></input>

                <h5>Company Link:</h5>
                <input placeholder="optional" value={jobForm.companyLink}
                    onChange={e => setJobForm({
                        ...jobForm,
                        companyLink: e.target.value
                    })} ></input>

                <h5> Post Date:</h5>
                <input value={jobForm.postdate}
                    onChange={e => setJobForm({
                        ...jobForm,
                        postdate: e.target.value
                    })} ></input>
                <br />
                {errorMsg}
                <br />
                <br />
                <button onClick={
                    onSubmitAddJobButtonClick
                }>
                    Submit
                </button>
            </div>
        </section>
    )
}
