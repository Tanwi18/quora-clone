import React, { useEffect, useState } from 'react';
import db from '../firebase/firebase';
import Post from '../Post/Post';
import QuoraBox from '../QuoraBox/QuoraBox';
import './Fees.css';

const Feed = () => {

    const [posts, setPosts] = useState([]);
   console.log(posts)
    useEffect(()=>{
      db.collection('questions').orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) =>(({
          id:doc.id,
          question: doc.data()
          
      }))
      )))
    },[])
    
    return (
        <div className="feed">
            <QuoraBox></QuoraBox>
            {
                posts.map(({id, question})=>
                    // console.log(question.user,question.question)
                     <Post
                    key= {id}
                    Id={id} 
                    image= {question.imageUrl}
                     question= {question.question}
                     timestamp= {question.timestamp}
                     quoraUser = {question.user}
                     >

                     </Post>
                )
            }
           
        </div>
    );
};

export default Feed;