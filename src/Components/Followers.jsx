import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FollowersChild } from './FollowersChild'

export function Followers(props) {

  const [followers, setFollowers] = useState([])

  useEffect(() => {
    props.setShowNavbar(true)

    async function getFollowers() {
      const {data} = await Axios(
        {
          method: "get",
          url: `http://localhost:3002/followers`,
          headers: {token: localStorage.getItem('token')},
          data: {}
        }) 
        if (data.message) {
          setFollowers(data.followers)
        }
    }

    getFollowers()
  }, [props])

  return (
    <>
    
    <div className="container" id='followers'>
    <div className="row">
        {followers && followers.map((user)=> <FollowersChild key={user._id} user={user}/> )}
      </div>
    </div>
      
    </>
  )
}
