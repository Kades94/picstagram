import React from 'react';
import './Home.css';
import ImageUpload from './ImageUpload';
import Image from './Image';
import Header from './Header';

function Home({user, username, posts, setUsername}) {
        return (
        	<div className="container">
              {/*show images and image upload if user logged in*/}
              {user ? (<ImageUpload user={user} username={user.displayName}/>) : (<div className="noUser"><h4>Please Sign In</h4></div>)}
              <div className="imageContainer">
                    {posts.map(({post, id})=>{
                      return user ?
                        <Image 
                        key = {id}
                        id={id}
                        user={user}
                        username={post.username} 
                        imageUrl={post.imageUrl} 
                        caption={post.caption} 
                        />
                      : <div></div>
                    })}</div>

          </div>
        
        )
}
export default Home;