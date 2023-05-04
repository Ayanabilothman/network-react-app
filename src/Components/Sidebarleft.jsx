import React from 'react'
import '../Styles/Sidebarleft.css'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { userSelector } from '../Redux/Features/currentUserSlice';

export function Sidebarleft() {
  const user = useSelector(userSelector)
  
  return (
    <>
    {Object.keys(user).length !== 0 && <div className="left-sidebar">
        <div className="yellow-bg position-relative">
          <img src={user.image} alt="Profile_picture" className='d-block position-absolute bottom-0 start-50' />
        </div>
        <div className="white-bg">
          <div className="brief-info text-center">
            <h3>{user.first_name} {user.last_name}</h3>
            <small>{user.title}</small>
          </div>
          <div className="f text-center py-3 h5">
            <h4 className='h5'>Following</h4>
            <small>{user.following.length}</small>
          </div>
          <div className="f text-center py-3 h5">
            <h4 className='h5'>Followers</h4>
            <small>{user.followers.length}</small>
          </div>

          <div className="view-profile py-3 text-center">
            <Link to='/'>View Profile</Link>
          </div>

        </div>


      </div>}
      

    </>
  )
}
