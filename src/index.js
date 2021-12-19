import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Register from './Register';
import AddJob from './AddJob';
import JobDetails from './JobDetails';
import JobSearch from './JobSearch';
import JobSearchResult from './JobSearchResult';
import Login from './Login';
import MyFavoriteJob from './MyFavoriteJob';
import { Provider } from "react-redux";
import store from "../src/redux/store";
import EditJob from './EditJob';
import HomePage from './HomePage';
import Navbar from './NavBar';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} exact/>
        <Route path="/addJob" element={<AddJob />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/jobSearch" element={<JobSearch />} />
        <Route path="/jobSearch/:jobSearchQuery" element={<JobSearchResult />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editJob/:jobId" element={<EditJob />} />
        <Route path="/myFavorite/:myusername" element={<MyFavoriteJob />} />
      </Routes>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();
