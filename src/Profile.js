import * as React from "react";
import Avatar from 'react-avatar';
import './Profile.css'
import {useEffect, useState } from 'react';
import {db} from './firebase';
import Image from './Image';
import {
  useParams
} from "react-router-dom";
import ImageUpload from './ImageUpload';

function Profile({currentUser, guest, posts, users}) {
  const { user } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followingLength, setFollowingLength] = useState(0);
  const [id, setID] = useState('');
  const [userID, setUserID] = useState('');

useEffect(()=>{
  if(user){
  for(var i =0; i<users.length; i++){
    if(JSON.stringify(users[i].userData.username)==JSON.stringify(user)){
      setID(users[i].id);
      db.collection("users").doc(users[i].id).collection("following").onSnapshot((snapshot)=>{
        setFollowingLength(snapshot.size)
      })
    }
  }}
},[user]);

useEffect(()=>{
  if(currentUser){
  for(var i =0; i<users.length; i++){
    if(JSON.stringify(users[i].userData.username)==JSON.stringify(currentUser.displayName)){
      setUserID(users[i].id)
    }
  }}
},[currentUser]);

useEffect(()=>{
  if(currentUser){
  for(var i =0; i<users.length; i++){
    if(JSON.stringify(currentUser.displayName)==JSON.stringify(users[i].userData.username)){
      db.collection("users").doc(users[i].id).collection("following").onSnapshot((snapshot)=>{
        setFollowing(snapshot.docs.map(doc => ({
          followingID: doc.id,
          data: doc.data()
        })));
      })
    }
}}
},[currentUser]);

useEffect(()=>{
  if(user){
  for(var i =0; i<users.length; i++){
    if(JSON.stringify(users[i].userData.username)==JSON.stringify(user)){
        db.collection("users").doc(users[i].id).collection("followers").onSnapshot((snapshot)=>{
          setFollowers(snapshot.docs.map(doc => ({
            followID:doc.id,
            data: doc.data()
          }
          )));
        })
    }
  }
  }
},[user]);


  const followHandler = () => {
      console.log(following);
      db.collection("users").doc(id).collection("followers").add({
        followUser:currentUser.uid
      })
      db.collection("users").doc(userID).collection("following").add({
        followingUser:id
      })
  } 

const unfollowHandler = () => {
      console.log(following);
  for(var i =0; i<followers.length; i++){
    if(JSON.stringify(followers[i].data.followUser) == JSON.stringify(currentUser.uid)){
      db.collection("users").doc(id).collection("followers").doc(followers[i].followID).delete(); 
    }
  }
  
  for(var j =0; j<following.length; j++){
      if(JSON.stringify(following[j].data.followingUser) == JSON.stringify(id)){
        db.collection("users").doc(userID).collection("following").doc(following[j].followingID).delete(); 
        return;         
      }
  }
}

const checkFollow = () => {
  var num = followers.findIndex(follower=> JSON.stringify(follower.data.followUser) == JSON.stringify(currentUser.uid))
  return num;
}


  return (
    <div>
      <div className="profileContainer">
        <div className="profileHeader">
          <Avatar name={user} size="130" round={true}/>
          <div className="summary">
            <div className="userProfile"><strong style={{fontSize:'20px', alignSelf:'center'}}>{user} </strong>
              {/*current user is user imageupload*/}
              {JSON.stringify(user)===JSON.stringify(currentUser.displayName) ?
              (<div className="profileButton"><ImageUpload user={currentUser.displayName} username={currentUser.displayName}/></div>):
              checkFollow()>-1 ? (<button className="follow" disabled={guest}  onClick={unfollowHandler}>Unfollow</button>):(<button className="follow" disabled={guest} onClick={followHandler}>Follow</button>)}
            </div>
            <div className="info">
              <div> {posts.filter(({post}) => post.username === user).length} Posts</div>
              <div>{followers.length} Followers</div>
              <div>{followingLength} Following</div>
            </div>
            <div style={{color:'grey'}}>Career</div>
            <div>Signature</div>
          </div>
        </div>
        <div className="panel">
          <div className="panel1 active">Posts</div>
          <div className="panel2">Saved</div>
          <div className="panel3">Tagged</div>
        </div>
        <div className="profileBody">
                    {posts.map(({post, id})=>{
                      return post.username === user ?
                        <Image 
                        id={id}
                        user={currentUser}
                        username={post.username} 
                        imageUrl={post.imageUrl} 
                        caption={post.caption} 
                        guest={guest}
                        />:''
                    })}
        </div>
      </div>
    </div>
  );
}
export default Profile;