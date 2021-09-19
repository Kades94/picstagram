import React, {useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';
import Image from './Image';
import Header from './Header';
import './App.css';
import { Button, Modal } from 'react-bootstrap';
import {db,auth} from './firebase';
import { BsFillPersonPlusFill, BsFillLockFill } from "react-icons/bs";


function App() {

	const [openLogin, showLogin] = useState(false);
	const [openSignUp, showSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // if user has logged in...
        setUser(authUser);
      } else {
        // if user has logged out... 
        setUser(null);
      }
      
    })
    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
      // This is where the code runs
      db.collection('images').onSnapshot(snapshot => {
        // every time a new post is added, this code fires up
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })
  }, []);


	const signUp = (e) =>{
    	e.preventDefault();
    	auth.createUserWithEmailAndPassword(email, password)
    	.then((authUser) => {
    	  return authUser.user.updateProfile({
    	    displayName: username
    	  })
    	})
    	.catch((error) => alert(error.message));
			showSignUp(false);
	}

	const login = (e) =>{
		e.preventDefault();
		auth.signInWithEmailAndPassword(email,password)
		.catch(error => alert(error.message));
		showLogin(false);
	}

	const signOut =()=>{
		auth.signOut();
	}


        return (
        	<div className="container">

    			<Modal show={openSignUp} onHide={() => showSignUp(false)} >
      				<Modal.Header closeButton><BsFillPersonPlusFill/></Modal.Header>
      				<Modal.Body>
      					<div>
      					<form className="signUpModal">
      						<input type="text" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      						<input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
      						<input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      						<Button type="submit" onClick={signUp}>Submit</Button>
      					</form>
      					</div>
      				</Modal.Body>
    			</Modal>

    			<Modal show={openLogin} onHide={() => showLogin(false)} >
      				<Modal.Header closeButton><BsFillLockFill/></Modal.Header>
      				<Modal.Body>
      					<div className="loginModal">
                  <form className="loginModal">
      						  <input type="text" placeholder="email address" value ={email} onChange={(e) => setEmail(e.target.value)} />
      						  <input type="text" placeholder="password" value ={password} onChange={(e) => setPassword(e.target.value)} />
      						  <Button onClick ={login}>Submit</Button>
                  </form>
      					</div>
      				</Modal.Body>
    			</Modal>

              <Header showSignUp={showSignUp} showLogin={showLogin} user={user} signOut={signOut}/>
              {user ? (<ImageUpload user={user} username={user.displayName}/>) : (<div className="noUser"><h4>Please Sign In</h4></div>)}
              <div className="imageContainer">
                    {posts.map(({post, id})=>{
                      return user ?
                        <Image 
                        key = {id}
                        username={post.username} 
                        imageUrl={post.imageUrl} 
                        imageName={post.imagename}
                        caption={post.caption} 
                        post={posts}
                        />
                      : <div></div>
                    })}</div>

          </div>
        
        )
}
export default App;