import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/FollowRequestDiv.css'

export function FollowRequestDiv(props) {
  const user = props.user
  const followerUserId = user._id
  const navigator = useNavigate()
  const [componentDead, setComponentDead] = useState(false)

  function openProfile() {
    navigator('/Aya')
  }

  async function confirmRequest() {    
    const {data} = await Axios(
      {
        method: 'put',
        url: `http://localhost:3002/follow_user/${followerUserId}`,
        headers: {token: localStorage.getItem('token')},
        data: {}
      }) 
    console.log(data)
    if (data.message) {
      setComponentDead(true)
    }
  }

  function rejectRequest() {
    navigator('/')
  }

  return (
    <>
    {!componentDead && <div className='follow-request-div d-flex align-items-center p-2 mb-3 '>
        <div className='img-side-div me-3 pointer align-self-start' onClick={openProfile}>
          <img src={user.image} alt="Profile_picture" />
        </div>
        <div className='user-side-div'>
          <strong className='h6 pointer' onClick={openProfile}>{user.first_name} {user.last_name}</strong>
          <div className="follow-request-btns my-2">
            <button className='btn me-2 btn-success py-1' onClick={confirmRequest}>Confirm</button>
            <button className='btn me-2 btn-danger py-1' onClick={rejectRequest}>Reject</button>
          </div>
        </div>
      </div>}
      
    </>
  )
}
