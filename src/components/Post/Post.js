import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Post.css';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import Modal from 'react-modal';
import { selectquestionId, selectquestionName, setQuestionInfo } from '../../features/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase/firebase';
import { selectUser } from '../../features/userSlice';
import firebase from 'firebase';

const customStyles = {
    overlay: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginLeft: '-350px',
        marginRight: '-50%',
        // marginTop: '-200px',
        height: 500,
        width: 590,
        transform: 'translate(-50%, -50%)',
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: '1000'
    },
};

Modal.setAppElement('#root');

const Post = ({ Id, question, image, timestamp, quoraUser }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [answer, setAnswer] = useState('');
    const [getAnswer, setGetAnswer] = useState([]);

    console.log(getAnswer)
    const dispatch = useDispatch();

    const questionId = useSelector(selectquestionId);
    const questionName = useSelector(selectquestionName);
    const user = useSelector(selectUser);
    // console.log(quoraUser)
    // console.log(question)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleAnswer = (e) => {
        e.preventDefault()

        if (questionId) {
            db.collection('questions').doc(questionId)
                .collection('answer').add({
                    questionId: questionId,
                    answer: answer,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user
                })
            setAnswer("");
            closeModal();
        }
    }

    useEffect(() => {
        if (questionId) {
            db.collection('questions').doc(questionId).collection
                ('answer').orderBy('timestamp', 'desc').onSnapshot
                (snapshot => setGetAnswer(snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        answers: doc.data()

                    }
                ))))
        }
    }, [])
    console.log(answer)
    return (
        <div className="post"
            onClick={() => dispatch(setQuestionInfo({
                questionId: Id,
                questionName: question
            }))}
        >
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
                    <button className="post-btnAnswer" onClick={openModal}>Answer</button>

                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                    >
                        <div className="modal-title">
                            <h1>{question}</h1>
                        </div>
                        <p>asked by <span className="name">{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</span>
                            on <span className="time">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                        </p>
                        <div className="modal-answer">
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter Your Answer"
                                type="text"></textarea>
                        </div>
                        <div className="modal-buttons">
                            <div style={{ transform: 'translateX(270px)' }}>
                                <button onClick={closeModal} className="cancel">Cancel</button>
                                <button
                                    onClick={handleAnswer}
                                    type="submit"
                                    className="add-Answer">
                                    Add Answer
                                </button>
                            </div>
                        </div>

                    </Modal>

                </div>
                <div className="post-answer">
                    {
                        getAnswer.map(({ id, answers }) => (
                            <p
                                key={id}
                                style={{ position: "relative", paddingBottom: "5px" }}>
                                { Id === answers.questionId ? (<span>
                                    {
                                        answers.answer
                                    }

                                    <br />
                                    <span
                                        style={{
                                            position: "absolute",
                                            color: "gray",
                                            fontSize: "small",
                                            display: "flex",
                                            right: "0px"
                                        }}>
                                        <span style={{ color: "#b92b27" }}>
                                            {
                                                answers.user.displayName ? answers.user.displayName
                                                    : answers.user.email
                                            } on {new Date(answers.timestamp?.toDate()).toLocaleString()}
                                        </span>
                                    </span>
                                </span>
                                ) : (
                                    ""
                                )
                                }
                            </p>
                        ))
                    }

                </div>
                <img src={image} alt=""></img>
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