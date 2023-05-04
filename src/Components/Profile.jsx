import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import cover from '../img/cover.jpg'
import { userSelector } from '../Redux/Features/currentUserSlice'
import '../Styles/Profile.css'
import { SinglePost } from './SinglePost'

export function Profile(props) {
  const user = useSelector(userSelector)

  useEffect(()=>{
    props.setShowNavbar(true)
  },[props])

  return (
    <section className='py-5 mt-5'>
      <div className='container'>
        <div className="cover-photo ">
          <img src={cover} alt="cover-photo" className='w-100 rounded'/>
        </div>
        <div className="d-flex">
        <div className="profile-picture">
          <img src={user.image} alt="profile-picture"/>
        </div>
        <div className="d-flex w-75 ms-auto">
          <div>
        <h3 className="name mt-3">{user.first_name} {user.last_name}</h3>
        <h6 className='mt-2'>{user.title}</h6>
          </div>
        <div className='ms-auto mt-3 me-5'>
          <button className='btn btn-success mx-2'><i className="fa-solid fa-user-plus me-3"></i>Follow</button>
          <button className='btn btn-yellow mx-2 text-white'><i className="fa-solid fa-message me-3"></i>Message</button>
        </div>

        </div>
        
        </div>
        <hr />

        {posts.length > 0 && posts.map((post)=>
          <SinglePost setUpdatedPost={setUpdatedPost} setShowEditForm={setShowEditForm} post={post} key={post._id}/>
        )}

        
      </div>
    </section>
  )
}
