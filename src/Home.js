import React from 'react';
import './Home.css';
import ImageUpload from './ImageUpload';
import Image from './Image';
import ReactTooltip from "react-tooltip";

function Home({user, posts, guestSignIn, guest}) {
  const guestClicked=()=>{
    var guest = true;
    return guestSignIn(guest);
    console.log(user);
  }
        return (
        	<div className="container">
              {/*show images and image upload if user logged in*/}
              {user ? (<ImageUpload guest={guest} user={user} username={user.displayName}/>) 
              :(<div className="noUser"><p>Please Sign In</p><p>or</p>
               <p className="guestSignIn" 
                onClick={guestClicked}
                data-tip="Guests dont have access to following features:Likes, Comments, Follow, Image Uploads" data-for='toolTip1' data-place='bottom'>Guest Sign In
               </p><ReactTooltip id="toolTip1" /></div>)}
              <div className="imageContainer">
                    {posts.map(({post, id})=>{
                      return user ?
                        <Image 
                        key = {id}
                        id={id}
                        guest={guest}
                        user={user}
                        username={post.username} 
                        imageUrl={post.imageUrl} 
                        caption={post.caption} 
                        uid={post.uid}
                        />
                      : <div></div>
                    })}</div>

          </div>
        
        )
}
export default Home;