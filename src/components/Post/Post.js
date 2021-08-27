// import { Avatar } from '@material-ui/core';
// import React from 'react';
// import './Post.css';
// import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
// import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
// import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
// import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
// import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
// import userEvent from '@testing-library/user-event';
// import Modal from 'react-modal';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectQuestionId, selectQuestionName, setQuestionInfo } from '../../features/QuestionSlice';
// import db from '../firebase/firebase';
// import { selectUser } from '../../features/userSlice';
// import { useEffect } from 'react';
// import firebase from 'firebase';

// Modal.setAppElement('#root')

// const Post = ({ Id, question, image, timestamp, quoraUser }) => {

//     const user = useSelector(selectUser)
//     const [openModal, setOpenModal] = useState(false);
//     const dispatch = useDispatch()

//     const questionId = useSelector(selectQuestionId)
//     const questionName = useSelector(selectQuestionName)

//     const [answer, setAnswer] = useState("");

//     const [getAnswers, setGetAnswers] = useState([]);


//     useEffect(() => {
//         if (questionId) {
//             db.collection("questions")
//                 .doc(questionId)
//                 .collection("answer")
//                 .orderBy("timestamp", "desc")
//                 .onSnapshot((snapshot) =>
//                     setGetAnswers(
//                         snapshot.docs.map((doc) => ({
//                             id: doc.id,
//                             answers: doc.data()
//                         }))
//                     )
                   
//                 );
//         }
      

//     }, [])
//     console.log(getAnswers);

//     const handleAnswer = (e) => {
//         e.preventDefault()

//         if (question) {
//             db.collection('questions').doc(questionId).collection('answer').add({
//                 questionId: questionId,
//                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                 answer: answer,
//                 user: user
//             })


//             setAnswer("")
//             setOpenModal(false)
//         }
//     }

//     return (
//         <div className="post"
//             onClick={() => dispatch(setQuestionInfo({
//                 questionId: Id,
//                 questionName: question
//             }))}

//         >
//             <div className="post-info">
//                 <Avatar
//                     src={quoraUser.photo}
//                 ></Avatar>
//                 <h5>{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</h5>
//                 <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
//             </div>
//             <div className="post-body">
//                 <div className="post-question">
//                     <p>{question}</p>
//                     <button
//                         onClick={() => setOpenModal(true)}
//                         className="post-btnAnswer">Answer</button>

//                     <Modal
//                         isOpen={openModal}
//                         onRequestClose={() => setOpenModal(false)}
//                         shouldCloseOnOverlayClick={false}
//                         style={{
//                             overlay: {
//                                 width: 680,
//                                 height: 550,
//                                 backgroundColor: "rgba(0,0,0,0.8)",
//                                 zIndex: "1000",
//                                 top: "50%",
//                                 left: "50%",
//                                 marginTop: "-250px",
//                                 marginLeft: "-350px",
//                             },
//                         }}
//                     >
//                         <div className="modal__question">
//                             <h1>{question}</h1>
//                             <p>
//                                 asked by{" "}
//                                 <span className="name">{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</span>{" "}
//                                 {""}
//                                 on
//                                 <span className="name">
//                                     {new Date(timestamp?.toDate()).toLocaleString()}
//                                 </span>
//                             </p>
//                         </div>
//                         <div className="modal__answer">
//                             <textarea
//                                 required
//                                 value={answer}
//                                 onChange={(e) => setAnswer(e.target.value)}
//                                 placeholder="Enter Your Answer"
//                                 type="text"
//                             />
//                         </div>
//                         <div className="modal__button">
//                             <button className="cancle" onClick={() => setOpenModal(false)}>
//                                 Cancel
//                             </button>
//                             <button type="sumbit"

//                                 onClick={handleAnswer}
//                                 className="add">
//                                 Add Answer
//                             </button>
//                         </div>
//                     </Modal>


//                 </div>
//                 <div className="post__answer">
//                     {
//                         getAnswers.map(({ id, answers }) => (
//                             <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
//                                 {Id === answers.questionId ? (
//                                     <span>
//                                         {answers.answer}
//                                         <br />
//                                         <span
//                                             style={{
//                                                 position: "absolute",
//                                                 color: "gray",
//                                                 fontSize: "small",
//                                                 display: "flex",
//                                                 right: "0px",
//                                             }}
//                                         >
//                                             <span style={{ color: "#b92b27" }}>
//                                                 {answers.user.displayName
//                                                     ? answers.user.displayName
//                                                     : answers.user.email}{" "}
//                                                 on{" "}
//                                                 {new Date(answers.timestamp?.toDate()).toLocaleString()}
//                                             </span>
//                                         </span>
//                                     </span>
//                                 ) : (
//                                     ""
//                                 )}
//                             </p>
//                         ))}
//                 </div>
//                 <img src={image} alt=""></img>
//             </div>
//             <div className="post-footer">
//                 <div className="post-footerAction">
//                     <ArrowUpwardOutlinedIcon></ArrowUpwardOutlinedIcon>
//                     <ArrowDownwardOutlinedIcon></ArrowDownwardOutlinedIcon>
//                 </div>
//                 <RepeatOutlinedIcon></RepeatOutlinedIcon>
//                 <ChatBubbleOutlineOutlinedIcon></ChatBubbleOutlineOutlinedIcon>

//                 <div className="post-footerLeft">
//                     <ShareOutlinedIcon></ShareOutlinedIcon>
//                     <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default Post;



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
import { selectQuestionId, selectQuestionName, setQuestionInfo } from '../../features/QuestionSlice';
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
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: '1000'
    },
};

Modal.setAppElement('#root');

const Post = ({ Id, question, image, timestamp, quoraUser }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [answer, setAnswer] = useState('');
    const [getAnswer, setGetAnswer] = useState([]);

  
    const dispatch = useDispatch();

    const questionId = useSelector(selectQuestionId);
    const questionName = useSelector(selectQuestionName);
    const user = useSelector(selectUser);
   
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
    console.log(getAnswer)
   
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
                        <div className="modal-button">
                            <div style={{ transform: 'translateX(270px)' }}>
                                <button onClick={closeModal} className="cancel">Cancel</button>
                                <button
                                    onClick={handleAnswer}
                                    type="submit"
                                    className="add">
                                    Add Answer
                                </button>
                            </div>
                        </div>

                    </Modal> 


                </div>
                <div className="post-answer">
                    {
                        getAnswer.map(({id,answers}) => (
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
                                ) : ("")
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