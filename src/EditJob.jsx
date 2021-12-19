import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from "react-redux";

export default function EditJob(props) {
    const jobId = useParams().jobId;
    const state = useSelector((state) => state);
    const username = useSelector(state => state.username);
    const navigate = useNavigate();
    const [job, setJob] = useState([]);
    const [jobForm, setJobForm] = useState({
        id: jobId,
        title: '',
        location: '',
        companyName: '',
        description: '',
        employerEmail: '',
        companyLink: '',
        postdate: '',
        owner: username
    });

    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(() => console.log("Success Login"))
            .catch(() => navigate('/login'))
    }
    useEffect(checkLogin, []);

    function findJobDetails() {
        axios.get('/api/jobs/find/findById/' + jobId)
            .then(
                response => setJobForm(response.data[0]))
            .catch(error => console.log("Could not find Job"))
    }
    useEffect(findJobDetails, []);


    return (
        <section className="job-container">
            <div>
                <h2>Edit My Posting: </h2>
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
                <input value={jobForm.companyLink}
                    onChange={e => setJobForm({
                        ...jobForm,
                        companyLink: e.target.value
                    })} ></input>

                <div>
                    <button onClick={
                        () => axios.post('/api/jobs/update/' + jobId, jobForm)
                            .then(response => {
                                console.log(response);
                                navigate('/job/' + jobId);
                            })
                            .catch(error => console.error(error))
                    }>
                        Submit Update
                    </button >
                </div>
            </div>
        </section>
    )
}
