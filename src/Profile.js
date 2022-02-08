import * as React from "react";
import Avatar from 'react-avatar';
import Header from './Header';
import './Profile.css'
import {useEffect, useState } from 'react';
import {db} from './firebase';
import Image from './Image';
import {
  useParams
} from "react-router-dom";
import {auth} from './firebase';


function Profile({currentUser, username, posts}) {
  const { user } = useParams();

  return (
    <div>
      <div className="profileContainer">
        <div className="profileHeader">
          <Avatar name={user} size="130" round={true}/>
          <div className="summary">
            <div><strong style={{fontSize:'20px'}}>{user}</strong></div>
            <div className="info">
              <div> {posts.filter(({post}) => post.username === user).length} Posts</div>
              <div>Followers</div>
              <div>Following</div>
            </div>
            <div style={{color:'grey'}}>Web Developer</div>
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
                        />:''
                    })}
        </div>
      </div>
    </div>
  );
}
export default Profile;