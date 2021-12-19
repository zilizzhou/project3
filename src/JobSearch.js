
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { changeUsernameStatus } from "./redux/actions";
import React, { useEffect, useState } from "react";
import "./style/HomeSearchPage.css";

function SearchPage() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState('');
  const [job, setJob] = useState({
    title: 'No job selected',
  })
  const [currentUserName, setCurrentUserName] = useState('');
  const [errorMsg, setError] = useState(null);
  const newUsername = useSelector(state => state.newUsername);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const username = useSelector(state => state.username);

  function onSearchButtonClick() {
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    } else {
      navigate("/jobSearch/" + formInput);
    }
  }

  function onFavoriteListClick() {
    if (!currentUserName) {
      setError("You have to login first");
      return;
    } else {
      navigate("/myFavorite/" + currentUserName);
    }
  }

  const helperComponent = (currentUserName) ?
    (<>
      <div>
        <button onClick={onFavoriteListClick}>
          My Favorite
        </button>
      </div>
    </>) :
    (<div></div>);


  return (
    <div>
      <section id="search_box">
        {errorMsg}
        <input type='text' value={formInput}
          className="search"
          placeholder="Job title"
          onChange={(e) => {
            setError(null);
            setFormInput(e.target.value)
          }} />
      </section>

      <button id="btn" onClick={onSearchButtonClick}>
        Search for Jobs
      </button>
      <div>
        {helperComponent}
      </div>
    </div>
  );
}

export default SearchPage;
