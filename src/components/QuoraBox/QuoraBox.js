import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './QuoraBox.css';

const QuoraBox = () => {

    const user = useSelector(selectUser);
    return (
        <div className="quorabox">
            <div className="quorabox-info">
                <Avatar
                  src={user.photo}
                ></Avatar>
                <h5>{user.email}</h5>
            </div>
            <div className="quorabox-quora">
               <p>What is your question or link?</p>
            </div>
        </div>
    );
};

export default QuoraBox;