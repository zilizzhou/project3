import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import "./style/Job.css";

export default function MyFavoriteJob() {
    const [myfavoriteJobsListID, setMyFavoriteJobsListID] = useState([]);
    const myusername = useParams().myusername;
    const [currentUser, setCurrentUser] = useState();
    const [jobArray, setJobArray] = useState([]);

    function getUserFavoriteJobIDList() {
        axios.get('/api/users/findMyFavorites/' + myusername)
            .then(response => {
                setMyFavoriteJobsListID(response.data);
                for (let jobId of response.data) {
                    axios.get('/api/jobs/find/findById/' + jobId)
                        .then(response => {
                            setJobArray([
                                ...jobArray,
                                response.data
                            ]);
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.error(error));
    }


    useEffect(getUserFavoriteJobIDList, []);
    const favoritejobListComponent = jobArray.map(job => {
        return (<>
            <p>
                <Link to={"/job/" + job[0].id}>{job[0].title} - {job[0].location} - {job[0].companyName}</Link>
            </p>
        </>)
    })

    const helperComponent = (jobArray.length > 0) ?
        (<>
            {favoritejobListComponent}
        </>) :
        (<div></div>)
    return (
        <div>
            <h1 className="favoriate_result">My favorite jobs</h1>
            <section id="link"> {helperComponent} </section>
        </div>
    )
}