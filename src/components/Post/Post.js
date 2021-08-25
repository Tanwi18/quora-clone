import { Avatar } from '@material-ui/core';
import React from 'react';
import './Post.css';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import userEvent from '@testing-library/user-event';

const Post = ({id, question, image, timestamp, quoraUser}) => {
    console.log(quoraUser)
    console.log(question)
    return (
        <div className="post">
            <div className="post-info">
                <Avatar
                  src={quoraUser.photo}
                ></Avatar>
                <h5>{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className="post-body">
                <div className="post-question">
                    <p>{question}</p>
                    <button className="post-btnAnswer">Answer</button>
                </div>
                <div className="post-answer">
                    <p></p>
                </div>
                <img src="" alt=""></img>
            </div>
            <div className="post-footer">
                <div className="post-footerAction">
                    <ArrowUpwardOutlinedIcon></ArrowUpwardOutlinedIcon>
                    <ArrowDownwardOutlinedIcon></ArrowDownwardOutlinedIcon>
                </div>
                <RepeatOutlinedIcon></RepeatOutlinedIcon>
                <ChatBubbleOutlineOutlinedIcon></ChatBubbleOutlineOutlinedIcon>

                <div className="post-footerLeft">
                    <ShareOutlinedIcon></ShareOutlinedIcon>
                    <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
                </div>
            </div>

        </div>
    );
};

export default Post;