import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import "./style/Job.css";

export default function () {
    const jobId = useParams().jobId;
    const [job, setJob] = useState(null);
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const username = useSelector(state => state.username);
    const [isFavorited, setIsFavorited] = useState();
    const [myfavoriteJobsListID, setMyFavoriteJobsListID] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState([]);

    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then((response) => {
                setCurrentUserName(response.data);
            })
            .catch(() => navigate('/login'))
    }

    function getUserFavoriteJobIDList() {
        axios.get('/api/users/findMyFavorites/' + username)
            .then(response => {
                setMyFavoriteJobsListID(response.data);
            })
            .catch(error => console.error(error));
    }

    useEffect(getUserFavoriteJobIDList, []);

    setTimeout(() => {
        for (let id of myfavoriteJobsListID) {
            console.log(id);
            if (jobId == id) {
                setIsFavorited(true);
            } else {
                setIsFavorited(false);
            }
        }
    }, 500)


    function findJobDetails() {
        axios.get('/api/jobs/find/findById/' + jobId)
            .then(response => setJob(response.data))
            .catch(error => console.log("Could not find Job"));
    }
    useEffect(findJobDetails, []);

    const favoriteButtonComponent = (isFavorited) ?
        (<>
            <button> Unfavorite</button>
        </>)
        : (<>
            <button
                onClick={() => {
                    axios.post('/api/users/addMyFavoriteJob/' + username, jobId)
                        .then((response) => {
                            console.log(response);
                            setIsFavorited(!isFavorited);
                        })
                        .catch((error) => console.log(error))
                }}
            > Favorite</button>
        </>);


    const funcComp = (username == state.jobOwner) ?
        (<>
            <button
                onClick={() => {
                    axios.post('/api/jobs/delete/' + jobId)
                        .then((response) => {
                            console.log("Success delete!");
                            navigate('/')
                        })
                        .catch((error) => console.log(error))
                }}
            >Delete</button>
            <button onClick={() => navigate('/editJob/' + jobId)}>Edit</button>
        </>)
        : (<></>);

    const jobDetailComponent = job ?
        (
            job.map(j => {
                return (<>

                    <div> <b>Job Title:</b> {j.title} </div>
                    <div> <b>Company:</b> {j.companyName} </div>
                    <div> <b>Location:</b> {j.location} </div>
                    <div> <b>Description:</b> {j.description}</div>
                    <div> <b>Employer Email:</b> <a href="mailto:m.bluth@example.com">{j.employerEmail}</a> </div>
                    {j.companyLink && <div> <b>Company Link:</b>{j.companyLink} </div>}
                    <div> <b>Post Date:</b> {j.postdate} </div>

                </>)
            })
        ) :
        (<div> No Job found </div>);

    return (
        <div>
            <h1 className="favoriate_result">Details</h1>

            <section id="job-detail">
                {jobDetailComponent}
                {favoriteButtonComponent}
                {funcComp}
            </section>

        </div>
    )
}