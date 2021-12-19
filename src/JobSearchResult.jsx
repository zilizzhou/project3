import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router";
import "./style/Job.css";

export default function JobSearchResult() {
    const [selectedJob, setSelectedJob] = useState([]);
    const jobSearchQuery = useParams().jobSearchQuery;
    const dispatch = useDispatch();

    function findSelectedJob() {
        axios.get('/api/jobs/find/findByTitle/' + jobSearchQuery)
            .then(response => {
                setSelectedJob(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findSelectedJob, []);

    const jobListComponent = selectedJob.map(job => {
        return (<>
            <p>
                <Link to={"/job/" + job.id} onClick={() => {
                    dispatch({type: 'UPDATE_JOB_OWNER', jobOwner: job.owner});
                }}>
                 {job.companyName} -  {job.location} - {job.title}  
                </Link>
            </p>
        </>)
    })

    return (
        <div>
        <h1 className="favoriate_result">These are search result the jobs: </h1>
        <div id="link">
            {jobListComponent}
        </div>
      </div>
    )
}