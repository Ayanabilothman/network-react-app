import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import '../Styles/SideBarRight.css'
import { FollowRequestDiv } from './FollowRequestDiv'
import { Suggestion } from './Suggestion'
import Axios from 'axios'
import { userSelector } from '../Redux/Features/currentUserSlice'
import { useSelector } from 'react-redux'

export function SidebarRight() {
  const currentUser = useSelector(userSelector)

  const [users, setUsers] = useState([])
  const [followRequests, setFollowRequests] = useState([])

  useEffect(() => {
    async function getUsers() {
      const { data } = await Axios.get('http://localhost:3002/all_users', { headers: { token: localStorage.getItem('token') } })
      if (data.message) {
        const usersArr = data.users
        // user that are not followed by the current user
        const userNotCurrentUser = usersArr.filter((user) => user._id !== currentUser._id)
        console.log(userNotCurrentUser)
        const finallUsers =  userNotCurrentUser.filter((user) => !(user.followers.includes(currentUser._id)))
        console.log(finallUsers)
        
        setUsers(finallUsers)
      }
    }

    async function getFollowRequests() {
      const { data } = await Axios.get('http://localhost:3002/follow_requests', { headers: { token: localStorage.getItem('token') } })
      if (data.message) {
        const usersFollowRequestsArr = data.requests.slice(0, 3)
        setFollowRequests(usersFollowRequestsArr)
      }
    }

    getUsers()
    getFollowRequests()
  }, [currentUser._id])

  return (
    <>
      <div className="yellow  d-flex align-items-center justify-content-between">
        <div className='text-white px-3 py-2'>
          <i className="fa-solid fa-user-group me-3"></i>
          Follow Requests
        </div>
        <div className='see-all text-white me-3 pointer'>
          See All
        </div>
      </div>
      <div className="white py-2">
        {followRequests.length > 0 ? followRequests.map((request) => <FollowRequestDiv key={request._id} user={request} />):
        <div>No requests yet!</div>}
      </div>


      <div className="yellow d-flex align-items-center justify-content-between">
        <div className='text-white px-3 py-2 d-inline-block'>
          <i className="fa-solid fa-person-circle-check me-3"></i>
          Suggestions
        </div>
        <div className='see-all text-white me-3 pointer'>
          See All
        </div>
      </div>
      <div className="white py-2">
        {users.length > 0 && users.map((user) => <Suggestion key={user._id} userInfo={user} />)}
      </div>
    </>
  )
}
