import React, { Component} from "react";
import "./style/HomePage.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import JobSearch from './JobSearch';

class HomePage extends Component{
      render() {
        return (
           <div className="container">
            <Header />
            <JobSearch/>
          </div>
        );
      }
    }
    
export default HomePage;