import React, { useState } from 'react';
import "./Navbar.css";
import HomeIcon from '@material-ui/icons/Home';
import Input from '@material-ui/core/Input';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, Button } from '@material-ui/core';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import db, { auth } from '../firebase/firebase';
import firebase from 'firebase';



// dropdown

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));



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

const Navbar = () => {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);



    let subtitle;
    const user = useSelector(selectUser);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [input, setInput] = useState("");
    const [inputUrl, setInputUrl] = useState("");

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleQuestion = (e) => {
        e.preventDefault();

        closeModal();

        db.collection("questions").add({
            question: input,
            imageUrl: inputUrl,
            //to update on runtime
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user
        });

        setInputUrl("");
        setInput("");
    };
    return (
        <div className="qHeader">
            <div className="qHeader-logo">
                <img src="https://as2.ftcdn.net/v2/jpg/02/94/33/03/500_F_294330359_ll2Q6r2Ov0EitHquCV5XUDVZjT9RIyyu.jpg" alt="" />
            </div>
            <div className="qHeader-icons">
                <div className="qHeader-icon">
                    <HomeIcon />
                </div>
                <div className="qHeader-icon">
                    <FeaturedPlayListOutlinedIcon />
                </div>
                <div className="qHeader-icon">
                    <AssignmentTurnedInOutlinedIcon />
                </div>
                <div className="qHeader-icon">
                    <PeopleAltOutlinedIcon />
                </div>
                <div className="qHeader-icon">
                    <NotificationsOutlinedIcon />
                </div>
            </div>
            <div className="qHeader-input">
                <SearchOutlinedIcon />
                <input type="text" placeholder="search here"></input>
            </div>
            <div className="remaining">
                <div className="qHeader-avatar">
                    

                    <div className={classes.root}>
                   
                    <div>
                        <Button
                            ref={anchorRef}
                            
                            onClick={handleToggle}
                        >
                            <Avatar

                            className="avatar"
                            src={user.photo}>
                            </Avatar>
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                               
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>

                                                    <p  onClick={() => auth.signOut()}>Log out</p>

                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>



                </div>
                <LanguageOutlinedIcon />
                <Button onClick={openModal}>Add question</Button>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    shouldCloseOnOverlayClick={false}
                >
                    <div className="modal-title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal-info">
                        <Avatar

                            className="avatar"
                            src={user.photo}>
                        </Avatar>

                        <p>{user.displayName ? user.displayName : user.email} asked</p>
                        <div className="modal-scope">
                            <PeopleAltOutlinedIcon></PeopleAltOutlinedIcon>
                            <p>Public</p>
                            <ExpandMoreIcon></ExpandMoreIcon>
                        </div>
                    </div>
                    <div className="modal-field">
                        <Input
                            required
                            value={input}
                            onChange={(e) => { setInput(e.target.value) }}
                            type="text"
                            placeholder="Ask your question">
                        </Input>
                        <div className="modal-fieldLink">
                            <LinkOutlinedIcon ></LinkOutlinedIcon>
                            <Input style={{ outline: 'none', border: 'none' }}
                                value={inputUrl}
                                onChange={(e) => { setInputUrl(e.target.value) }}
                                type="text"
                                placeholder="Optional: include a link that gives context">
                            </Input>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <div style={{ transform: 'translateX(270px)' }}>
                            <button onClick={closeModal} className="cancel">Cancel</button>
                            <button
                                onClick={handleQuestion}
                                type="submit"
                                className="add-question">
                                Add Question
                            </button>
                        </div>
                    </div>

                </Modal>
                


                {/* dropdown */}
                {/* <div className={classes.root}>
                   
                    <div>
                        <Button
                            ref={anchorRef}
                            
                            onClick={handleToggle}
                        >
                            <Avatar

                            className="avatar"
                            src={user.photo}>
                            </Avatar>
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                               
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>

                                                    <p  onClick={() => auth.signOut()}>Log out</p>

                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div> */}



            </div>
        </div>
    );
};

export default Navbar;




// import React, { useState } from 'react';
// import "./Navbar.css";
// import HomeIcon from '@material-ui/icons/Home';
// import Input from '@material-ui/core/Input';
// import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
// import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
// import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
// import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
// import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
// import { Avatar, Button} from '@material-ui/core';
// import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
// import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../features/userSlice';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
// import db, { auth } from '../firebase/firebase';
// import firebase from 'firebase';

// const customStyles = {
//     overlay: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         // marginLeft: '-350px',
//         marginRight: '-50%',
//         // marginTop: '-200px',
//         height: 500,
//         width: 590,
//         transform: 'translate(-50%, -50%)',
//         backgroundColor: "rgba(0,0,0,0.😎",
//         zIndex: '1000'
//     },
// };

// Modal.setAppElement('#root');

// const Navbar = () => {

//     let subtitle;
//     const user = useSelector(selectUser);
//     const [modalIsOpen, setIsOpen] = React.useState(false);
//     const [input, setInput] = useState("");
//     const [inputUrl, setInputUrl] = useState("");

//     function openModal() {
//         setIsOpen(true);
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     const handleQuestion =(e) => {
//        e.preventDefault();

//        closeModal();

//        db.collection("questions").add({
//          question: input,
//          imageUrl: inputUrl,
//          //to update on runtime
//          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//          user:user
//        });

//        setInputUrl("");
//        setInput("");
//     };
//     return (
//         <div className="qHeader">
//             <div className="qHeader-logo">

//             </div>
//             <div className="qHeader-icons">
//                 <div className="qHeader-icon">
//                     <HomeIcon />
//                 </div>
//                 <div className="qHeader-icon">
//                     <FeaturedPlayListOutlinedIcon />
//                 </div>
//                 <div className="qHeader-icon">
//                     <AssignmentTurnedInOutlinedIcon />
//                 </div>
//                 <div className="qHeader-icon">
//                     <PeopleAltOutlinedIcon />
//                 </div>
//                 <div className="qHeader-icon">
//                     <NotificationsOutlinedIcon />
//                 </div>
//             </div>
//             <div className="qHeader-input">
//                 <SearchOutlinedIcon />
//                 <input type="text" placeholder="search here"></input>
//             </div>
//             <div className="remaining">
//                 <div className="qHeader-avatar">
//                     <Avatar
//                         src={user.photo}
//                     />
//                 </div>
//                 <LanguageOutlinedIcon />
//                 <Button onClick={openModal}>Add question</Button>
//                 <Modal
//                     isOpen={modalIsOpen}
//                     // onAfterOpen={afterOpenModal}
//                     onRequestClose={closeModal}
//                     style={customStyles}
//                     shouldCloseOnOverlayClick={false}
//                 >
//                     <div className="modal-title">
//                         <h5>Add Question</h5>
//                         <h5>Share Link</h5>
//                     </div>
//                     <div className="modal-info">
//                         <Avatar className="avatar" 
//                             src={user.photo}>
//                         </Avatar>
//                         <p>{user.displayName ? user.displayName : user.email} asked</p>
//                         <div className="modal-scope">
//                             <PeopleAltOutlinedIcon></PeopleAltOutlinedIcon>
//                             <p>Public</p>
//                             <ExpandMoreIcon></ExpandMoreIcon>
//                         </div>
//                     </div>
//                     <div className="modal-field">
//                         <Input
//                         required
//                         value={input}
//                         onChange={(e)=>{setInput(e.target.value)}}
//                             type="text"
//                             placeholder="Ask your question">
//                         </Input>
//                         <div className="modal-fieldLink">
//                             <LinkOutlinedIcon ></LinkOutlinedIcon>
//                             <Input style={{ outline: 'none', border: 'none' }}
//                                value={inputUrl}
//                                onChange={(e)=>{setInputUrl(e.target.value)}}
//                                 type="text"
//                                 placeholder="Optional: include a link that gives context">
//                             </Input>
//                         </div>
//                     </div>
//                     <div className="modal-buttons">
//                         <div style={{ transform: 'translateX(270px)' }}>
//                             <button onClick={closeModal} className="cancel">Cancel</button>
//                             <button 
//                             onClick={handleQuestion}
//                             type="submit" 
//                             className="add-question">
//                                 Add Question
//                             </button>
//                         </div>
//                     </div>

//                 </Modal>
//                 <button className="" onClick={()=>auth.signOut()}>Log out</button>
//             </div>
//         </div>
//     );
// };

// export default Navbar