import React, {useEffect, useState } from 'react';
import Home from './Home';
import Profile from './Profile';
import {db,auth} from './firebase';
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import './Header.css';
import { Button, Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { BsFillPersonPlusFill, BsFillLockFill,BsHouseDoor } from "react-icons/bs";
import Avatar from 'react-avatar';

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [guest, setGuest] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        {/*user logged in*/}
        setUser(authUser);
        setGuest(false);
      } else if(guest){
        setUser(users[2].userData)
      } else{
        {/*user logged out*/}
        setUser(null);
      }
      
    })
    return () => {
      unsubscribe();
    }
  }, [user]);

  useEffect(() => {
      db.collection('images').onSnapshot(snapshot => {
        {/*set image posts*/}
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data(),
        })));
      })
  }, []);

  useEffect(()=>{
      db.collection("users").onSnapshot((snapshot)=>{
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                userData: doc.data()
            })));          
      })
}, [user]);

  const guestSignIn = (guest) => {
    if(guest){
      for(var i =0; i<users.length; i++){
        if(JSON.stringify(users[i].userData.username)==JSON.stringify("Guest")){
          setUser(users[2]);
        }
      }
    }
  }

  return (
    <div>
      <Router>
        <Header user={user} guest={guest}/>
        <Routes>
          <Route
          path="/"
          element={<Home guest={guest} user={user} posts={posts} guestSignIn={guestSignIn} />}
          />
          <Route
            path="/:user/:id"
            element={<Profile guest={guest} currentUser={user} posts={posts} users={users} />}
          />
        </Routes>
      </Router>
    </div>

  )
}

function Header({user, guest}) {
  const [openLogin, showLogin] = useState(false);
  const [openSignUp, showSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signUp = (e) =>{
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        });
        db.collection("users").add({
          username:username,
          uid:authUser.user.uid
        });
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
    window.location.reload(true);
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
            placeholder="Search..."  disabled
            style={{borderRadius:'20px', padding:'8px', width:'310px', border:'none'}}/>
          </div>
          <div className="buttonContainer">
            {user ? (
              <div>
              <Link to="/"><BsHouseDoor size="35"/></Link>{" "}
               <Link to={`/${guest ? user.username : user.displayName}/${user.uid}`}style={{ color: '#000' }} >
                  <Avatar name={guest ? user.username : user.displayName} size='35' round={true}/>
                </Link>
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
export default App;