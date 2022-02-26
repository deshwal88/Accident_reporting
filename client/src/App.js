import React from 'react';
import './index.css'
import FinalYearProjectLogo from './Images/FinalYearProjectLogo.jpg'
import Router from './router/Router';
import Menu from './router/Menu';
import { FcSearch } from "react-icons/fc";


// import FontAwesomeIcon from 'react-fontawesome'
const App = () => {


    return (
        <>
            <div className="container">

            </div>
            <div className="container2">
                <div className="item item1">
                    <div className="main_title">
                        <div className="header">
                            <img src={FinalYearProjectLogo} alt="Logo" className="logo" />
                            <h1 className="heading">Accident Tracking and Reporting system for vehicles</h1>

                        </div>
                    </div>
                </div>

                <div className="item item2">
                    <h2>Monitor</h2>
                    <Menu/>
                </div>
                <div className="item item3">
                    {/* <div className="item3_1">
                        <iframe width="300px" height="150px" src="https://www.youtube.com/embed/TFTh53nXnC0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div> */}

                    <div className="form">
                        <input type="text" className='input' placeholder='Enter key to search' />
                        <input type="text" className='input2' placeholder='Enter value to search' />
                        <button className='searchBtn'><FcSearch className='search' />&nbsp;&nbsp;Search</button>
                    </div>

                </div>
                <div className="item item4">
                    <Router />
                </div>
            </div>


        </>
    )
}
export default App;
