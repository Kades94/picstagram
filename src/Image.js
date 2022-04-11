import React, {useEffect, useState } from 'react';
import './Image.css';
import { BsFillHeartFill, BsFillChatFill } from "react-icons/bs";
import { Modal } from 'react-bootstrap';
import Avatar from 'react-avatar';
import {db} from './firebase';
import {Link} from "react-router-dom";
import firebase from "firebase";


function Image({id, username, user, imageUrl, caption, count, timestamp, uid, guest}) {

const [comments, setComments] = useState([]);
const [comment, setComment] = useState('');
const [likes, setLikes] = useState({})
const [openLightbox,showLightbox] = useState(false);
const [imgSrc, setImage] =useState('');

useEffect(()=>{
    if(id){
        db.collection("images").doc(id).collection("comments").onSnapshot((snapshot)=>{
            setComments(snapshot.docs.map((doc => doc.data()))
        )}
    )}
}, [id]);

useEffect(()=>{
    if(id){
        db.collection("images").doc(id).collection("likes").onSnapshot((snapshot)=>{
            setLikes(snapshot.docs.map(doc => ({
                likeID: doc.id,
                likeUsers: doc.data(),
            })));
        }
    )}
}, [id]);

const likeHandler = () => {
    if(!guest){
    for(var i = 0; i<likes.length; i++){
        {/*if user already liked, remove user from likes*/}
        if(likes[i].likeUsers.username.includes(user.displayName)){
            db.collection("images").doc(id).collection("likes").doc(likes[i].likeID).delete(); 
            return;         
        }
    }
    {/*add user likes*/}
    db.collection("images").doc(id).collection("likes").add({
        username:user.displayName
    });
}
}   

const sendComment= (e)=>{
    e.preventDefault();
    {/*add user comments*/}
    db.collection("images").doc(id).collection("comments").add({
        text:comment,
        username:user.displayName,
        time:new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString(),
        uid:user.uid

    });
    setComment('');
}


    	return(
        <div className="image">
            <Modal className="modal" show={openLightbox} onHide={() => showLightbox(false)} aria-labelledby="contained-modal-title-vcenter"
      centered size="lg" >
                <div className="lightbox">
                    <div className="lightboxImage"><img src={imgSrc}/></div>
                    <div className="lightboxComments">                
                        <div style={{overflow:'scroll', padding:'5px'}}>
                            {comments.map((comment)=>
                                (<p><Link to={`/${comment.username}/${comment.uid}`}><strong>{comment.username}: </strong></Link>{comment.text} <span style={{float:"right", fontSize:"12px", color:"grey"}}>posted {comment.time}</span></p>)
                            )}
                        </div>
                        <div style={{marginTop: 'auto', background:'whitesmoke'}}>
                            <form style={{padding:'5px'}}>
                                <input type="text" name="" placeholder="Reply..." value ={comment} disabled={guest} onChange={e=>setComment(e.target.value)}/>
                                <button disabled={guest} type="submit" onClick={sendComment}>Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="imageHeader">
                <Link to={`/${username}/${uid}`}style={{ color: '#000' }} >
                    <div><Avatar name={username} size="35" round={true}/>
                    {' '}{username}</div>
                </Link>
            </div>
            <div className="imageBody" onClick={showLightbox}><img onClick={(e) => setImage(e.target.src)} alt="" src={imageUrl}/></div>
            <div className="imageFooter">     
                <Link to={`/${username}/${uid}`}><strong>{username}:</strong></Link> {caption} 
                <div>
                    <span style={{color:'grey'}}><BsFillHeartFill className="count" onClick={likeHandler}/>{' '}{likes.length} likes</span>
                    <span style={{float:'right', color:'grey', paddingRight:'5px'}}><BsFillChatFill style={{color:'green'}}/>{' '}{comments.length} comments</span>
                </div>

            </div>

        </div>
        )     
    }
export default Image;