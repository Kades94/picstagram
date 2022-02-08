import React, {useEffect, useState } from 'react';
import Home from './Home';
import Header from './Header';
import Profile from './Profile';
import {db,auth} from './firebase';
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        {/*user logged in*/}
        setUser(authUser);
      } else {
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
        {/*new image is added*/}
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data(),
        })));
      })
  }, []);
  return (
    <div>
      <Router>
            <Header user={user} username={username} setUsername={setUsername}/>

        <Routes>
          <Route
          path="/"
          element={<Home user={user} posts={posts} username={username} setUsername={setUsername}/>}
          />
          <Route
          path="/:user"
          element={<Profile currentUser={user} posts={posts} username={username}/>}
          />
        </Routes>
      </Router>
    </div>

  )
}
export default App;