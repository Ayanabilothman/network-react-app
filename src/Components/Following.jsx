import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FollowingChild } from './FollowingChild'

export function Following(props) {

  const [following, setFollowing] = useState([])

  useEffect(() => {
    props.setShowNavbar(true)

    async function getFollowers() {
      const {data} = await Axios(
        {
          method: "get",
          url: `http://localhost:3002/following`,
          headers: {token: localStorage.getItem('token')},
          data: {}
        }) 
        if (data.message) {
            setFollowing(data.following)
        }
    }

    getFollowers()
  }, [props])

  return (
    <>
    <div className="container" id='followers'>
    <div className="row">

        {following && following.map((user)=> <FollowingChild key={user._id} user={user}/> )}
      </div>

    </div>
      
    </>
  )
}
