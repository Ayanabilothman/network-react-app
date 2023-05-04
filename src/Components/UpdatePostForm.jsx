import React, {useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/PostForm.css'
import Picker from 'emoji-picker-react';
import { userSelector } from '../Redux/Features/currentUserSlice';
import { updatePost } from '../Redux/Features/postsSlice';

export function UpdatePostForm(props) {
  const dispatch = useDispatch()

  const postTextArea = useRef(null)
  const postBtn = useRef(null)
  const user = useSelector(userSelector)

  const [openEmojis, setOpenEmojis] = useState(false)
  const [post, setPost] = useState({
    content: props.updatedPost.content,
    post_id: props.updatedPost._id
})

  function closeUpdateForm() {
    props.setShowEditForm(false)
  }

  function showEmojis() {
    setOpenEmojis(true)
  }

  function hideEmojis() {
    setOpenEmojis(false)
  }

  function handlePostChange(e) {
    setPost((previousState)=> {return { ...previousState, content: e.target.value}})
  }
  function onEmojiClick(e, emojiObject) {
    setPost((previousState)=> {return { ...previousState, content: post.content + emojiObject.emoji}})
  };

  async function editPost(e) {
    e.preventDefault()
    if (post.content.length > 0) {
      dispatch(updatePost(post))
      closeUpdateForm()
    }
  }

  useEffect(()=>{
    if (post.content.length > 0) {
      postBtn.current.classList.remove('disabled')
    } else {
      postBtn.current.classList.add('disabled')
    }
    postTextArea.current.value = post.content
  },[post])


  return (
    <>
      <div id='add-post-bg' className="top-0 bottom-0 start-0 end-0 position-fixed d-flex align-items-center justify-content-center">
        <div className="add-post-form w-50 px-5 py-3 position-relative">
          <div className="close-btn position-absolute top-0 end-0 m-3" onClick={closeUpdateForm}>
            <i className="fa-solid fa-rectangle-xmark text-white fa-2x pointer"></i>
          </div>
          <div className="add-post-heading text-center py-2">
            <h2 className='text-white'>
              Edit post
            </h2>
          </div>
          <div className="add-post-user d-flex align-items-center my-2">
            <img src={user.image} alt="Profile_picture" className='d-block ms-1 me-3'  />
            <div>
              <p className='text-white mb-1'>{user.first_name} {user.last_name}</p>
              <select name="" id="">
                <option default value="puplic">Puplic</option>
                <option value="followers">Followers</option>
                <option value="only_me">Only me</option>
              </select>
            </div>
          </div>

          <form onSubmit={editPost}>

          <div className="add-post-text position-relative">
            <textarea rows="10" placeholder='Update Post' className='py-2' ref={postTextArea} onClick={hideEmojis} onChange={handlePostChange}></textarea>
            <div className="add-post-emoji position-absolute bottom-0 end-0 m-3 pointer" onClick={showEmojis}>
              <i className="fa-solid fa-face-smile text-white"></i>
            </div>

            {openEmojis && <div className='emoji-picker position-absolute end-0'>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
            }
          </div>
          <div className="add-post-button">
            <button className='w-100 text-white btn disabled' ref={postBtn}>Save</button>
          </div>
          </form>


        </div>
      </div>
    </>
  )
}
