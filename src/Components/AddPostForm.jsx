import React, { useRef } from 'react'
import { useState } from 'react'
import '../Styles/PostForm.css'
import Picker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../Redux/Features/currentUserSlice';
import { useEffect } from 'react';
import { newPost } from '../Redux/Features/postsSlice';

export function AddPostForm(props) {
  const dispatch = useDispatch()

  const postTextArea = useRef(null)
  const postBtn = useRef(null)
  const user = useSelector(userSelector)

  const [openEmojis, setOpenEmojis] = useState(false)
  const [postText, setPostText] = useState({
    content: ''
  })

  function closePostForm() {
    props.setShowPostForm(false)
  }
  console.log(postText)

  function showEmojis() {
    setOpenEmojis(true)
  }

  function hideEmojis() {
    setOpenEmojis(false)
  }

  function handlePostChange(e){
    setPostText((previousState)=> {return { ...previousState, content: e.target.value}})
  }

  function onEmojiClick(e, emojiObject) {
    setPostText((previousState)=> {return { ...previousState, content: postText.content + emojiObject.emoji}})
  };

  async function addPost(e) {
    e.preventDefault()
    if (postText.content.length > 0) {
      dispatch(newPost(postText))
      closePostForm()
      props.setPostAdded(true)
    }
  }

  useEffect(()=>{
    if (postText.content.length > 0) {
      postBtn.current.classList.remove('disabled')
    } else {
      postBtn.current.classList.add('disabled')
    }
    postTextArea.current.value = postText.content
  },[postText])

  return (
    <>
      <div id='add-post-bg' className="top-0 bottom-0 start-0 end-0 position-fixed d-flex align-items-center justify-content-center">
        <div className="add-post-form w-50 px-5 py-3 position-relative">
          <div className="close-btn position-absolute top-0 end-0 m-3" onClick={closePostForm}>
            <i className="fa-solid fa-rectangle-xmark text-white fa-2x pointer"></i>
          </div>
          <div className="add-post-heading text-center py-2">
            <h2 className='text-white'>
              Create a post
            </h2>
          </div>
          <div className="add-post-user d-flex align-items-center my-2">
            <img src={user.image} alt="Profile_picture" className='d-block ms-1 me-3' />
            <div>
              <p className='text-white mb-1'>{user.first_name} {user.last_name}</p>
              <select name="" id="">
                <option default value="puplic">Puplic</option>
                <option value="followers">Followers</option>
                <option value="only_me">Only me</option>
              </select>

            </div>
          </div>

          <form onSubmit={addPost}>
            <div className="add-post-text position-relative">
              <textarea rows="10" placeholder='Start typing your post !' className='py-2' ref={postTextArea} onClick={hideEmojis} onChange={handlePostChange}></textarea>
              <div className="add-post-emoji position-absolute bottom-0 end-0 m-3 pointer" onClick={showEmojis}>
                <i className="fa-solid fa-face-smile text-white"></i>
              </div>

              {openEmojis && <div className='emoji-picker position-absolute end-0'>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
              }
            </div>
            <div className="add-post-button">
              <button className='w-100 text-white btn disabled' type="submit" ref={postBtn}>Post</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
