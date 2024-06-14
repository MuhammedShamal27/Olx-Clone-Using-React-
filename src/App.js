import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './store/Context';
import { useContext, useEffect } from 'react';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post  from './store/postContext';

function App() {

  const {setUser}= useContext(AuthContext)
  const {firebase} =useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })

  },)
  return (
    <div >
      <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/view" element={<View/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
