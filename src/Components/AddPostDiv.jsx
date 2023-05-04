import React from 'react'
import '../Styles/AddPostDiv.css'
import { useSelector } from 'react-redux';
import { userSelector } from '../Redux/Features/currentUserSlice';

export function AddPostDiv(props) {
  const user = useSelector(userSelector)

  function showPostForm() {
    props.setShowPostForm(true)
  }
  
  return (
    <>
      <div className="add-post d-flex">
        <div className='img-post-div text-center'>
          <img src={user.image} alt="Profile_picture"/>
        </div>
        <div className='text-post-div p-3 ms-2' onClick={showPostForm}>
          What's in your mind?
        </div>
      </div>
    </>
  )
}
