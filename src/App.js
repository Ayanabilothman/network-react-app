import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import { Home } from './Components/Home'
import { Userform } from './Components/Userform';
import { Profile } from './Components/Profile';
import { Navbar } from './Components/Navbar';
import {useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {userData, clearUser} from './Redux/Features/currentUserSlice';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getPosts } from './Redux/Features/postsSlice';
import { Followers } from './Components/Followers';
import { Following } from './Components/Following';
import { Loadingscreen } from './Components/Loadingscreen';

function App() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function setUserData() {
    const user = jwtDecode(localStorage.getItem('token'))
    console.log(user)
    const userId = user.id    
    const {data} = await Axios(
      {
        method: "get",
        url: `http://localhost:3002/profile/${userId}`,
        headers: {token: localStorage.getItem('token')},
        data: {}
      }) 
      console.log(data)
      setCurrentUser(true)
    dispatch(userData(data.user))
  }

  function getAllPosts() {
    dispatch(getPosts())
  }

  async function loginUser(user) {
    const {data} = await Axios.post('http://localhost:3002/login', user)
    if(data.message) {
      localStorage.setItem('token', data.token)
      getAllPosts()
      navigator('/home')
      setUserData()
    } else if (data.error) {
      setError(data.error)
    }
  }

  async function logout() {
    localStorage.clear()
    dispatch(clearUser())
    navigator('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setUserData()
      getAllPosts()
    }
  }, [])
  
  return (
    <>
      {showNavbar && <Navbar logout={logout}/>}
      {/* <ImgUpload/> */}
      <main>
        <Routes>
          <Route path="/" element={<Userform setShowNavbar={setShowNavbar} loginUser={loginUser} error={error}/>} />
           <Route path="/home" element={ currentUser ? <Home setShowNavbar={setShowNavbar}/> : <Loadingscreen/> } />
          <Route path="/profile/:id" element={<Profile setShowNavbar={setShowNavbar} />} />
          <Route path="/followers" element={<Followers setShowNavbar={setShowNavbar} />} />
          <Route path="/followings" element={<Following setShowNavbar={setShowNavbar} />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
