import './Header.css';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import {db,auth} from './firebase';
import { BsFillPersonPlusFill, BsFillLockFill } from "react-icons/bs";

function Header({user, username, setUsername}) {
  const [openLogin, showLogin] = useState(false);
  const [openSignUp, showSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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


    	return(
        <div>
          <Modal show={openSignUp} onHide={() => showSignUp(false)} centered size="sm" >
            <div className="form">
              <form> 
                <div className="icon"><BsFillPersonPlusFill /></div>
                  <input type="text" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                  <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <Button type="submit" onClick={signUp}>Sign Up</Button>
              </form>
            </div>
          </Modal>

          <Modal show={openLogin} onHide={() => showLogin(false)} size="sm" centered>
                <div className="form">
                  <form>
                    <div className="icon"><BsFillLockFill/></div>
                    <div><input type="text" placeholder="email address" value ={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div><input type="text" placeholder="password" value ={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    <Button onClick ={login}>Log In</Button>
                  </form>
                </div>
          </Modal>
			    <div className="nav">
          <div className="title">
    			 <Link to="/">Picstagram</Link>
          </div>
          <div>
           <input type="search" 
            placeholder="Search..." disabled 
            style={{borderRadius:'30px', padding:'5px'}}/>
          </div>
          <div className="buttonContainer">
            {user ? (
              <div>
                <Button variant="outline-dark" className="signOut" onClick={signOut}>Sign Out</Button>
              </div> )
            : (
            <div>
              <Button  variant="dark" className="signUp" onClick={()=>showSignUp(true)}>Sign Up</Button>
              <Button  variant="outline-dark" className="login" onClick={()=>showLogin(true)}>Log In</Button>
            </div>)
            }
          </div>
			</div>
      </div>
    	)
}
export default Header;