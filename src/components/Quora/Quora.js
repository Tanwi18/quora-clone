import React from 'react';
import './Quora.css'
import Feed from '../Feed/Feed';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Widget from '../Widget/Widget';


const Quora = () => {
    return (
        <div>
            <Navbar/>
            <div className="quora-content">
               <Sidebar></Sidebar>
               <Feed></Feed>
               <Widget></Widget>
            </div>
        </div>
    );
};

export default Quora;