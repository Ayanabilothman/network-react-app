import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, newComment, selectAllComments } from '../Redux/Features/commentsSlice'
import { deletePost } from '../Redux/Features/postsSlice'
import '../Styles/SinglePost.css'
import { Comment } from './Comment'
import Axios from 'axios'
import {userSelector} from '../Redux/Features/currentUserSlice'

export function SinglePost(props) {
  const dispatch = useDispatch()
  const commentInput = useRef(null)
  const user = useSelector(userSelector)
  const post = props.post
  const postId = post._id
  const postUserId = post.created_by._id
let postOwner
  if (postUserId === user._id){
    postOwner = true
  }
  const timestamp = new Date(post.createdAt).toString().slice(4, 24);

  const postCommentsObj = useSelector(selectAllComments)
  let commentsPerPost = []
  if (Object.keys(postCommentsObj).length > 0) {
    let commentsArr = postCommentsObj[postId]
    if (commentsArr !== undefined) {
      const commentsArrCopy = [...commentsArr]
      commentsPerPost = commentsArrCopy.sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
    }
  }
  
  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  const [actionsClicked, setActionsClicked] = useState(false)
  const [leaveComment, setLeaveComment] = useState(false)
  const [reactionCount, setReactionCount] = useState(post.reaction_count)
  const [comment, setComment] = useState({
    content: '',
    post_id: postId
  })

  function delete_post() {
    dispatch(deletePost(postId))
  }

  async function submitComment(e) {
    e.preventDefault()
    if (comment.content.length > 0) {
      dispatch(newComment(comment))
      commentInput.current.value = ''
      setLeaveComment(false)
    }
  }

  function handleChange(e) {
    setComment((previousState) => {
      return { ...previousState, content: e.target.value }
    })
  }

  function toggleActions() {
    setActionsClicked(!actionsClicked)
  }

  function showCommentInput() {
    setLeaveComment(true)
  }

  function showEditForm() {
    props.setUpdatedPost(post)
    props.setShowEditForm(true)
    setActionsClicked(false)
  }

  async function addReaction() {
    const {data} = await Axios.put('http://localhost:3002/post/add_reaction', {post_id:postId}, {headers:{token: localStorage.getItem('token')}})
    if (data.message) {
      setReactionCount(data.reaction_count)
    }
  }

  return (
    <>

      <div className="single-post p-3 my-4">
        <div className="header d-flex position-relative">
          {postOwner && <div className="actions-icons me-3 position-absolute end-0 top-0 pointer">
            <div className="dots-icons text-end">
              <i className="fa-solid fa-ellipsis p-2" onClick={toggleActions}></i>
            </div>
            {actionsClicked && <ul>
              <li onClick={delete_post}><i className="fa-solid fa-trash me-2"></i>Delete Post</li>
              <li onClick={showEditForm}><i className="fa-solid fa-pen-to-square me-2"></i>Edit Post</li>
              <li><i className="fa-solid fa-bookmark me-2"></i>Save Post</li>
            </ul>}
          </div>}
          
          <img src={post.created_by.image} alt="Profile_picture" />
          <div className='ms-3'>
            <h3 className='m-0 h5'>{post.created_by.first_name} {post.created_by.last_name}</h3>
            <small className='small-font'>{timestamp}</small>
          </div>
        </div>
        <hr className='my-2'/>
        <div className="content">
          <p>
            {post.content}
          </p>
        </div>
        <div className="reactions-count d-flex align-items-center justify-content-between">
          <div className="emojis">
            <small>{reactionCount} reactions</small>
          </div>

          <div>
            <small className='me-2'>{commentsPerPost.length} comments</small>
            <small>0 shares </small>
          </div>

        </div>
        <hr className='my-2' />
        <div className='reactions px-2 d-flex align-items-center justify-content-between'>
          <div className="emojis">
            <span className='m-1 pointer' onClick={addReaction}>👍</span>
            <span className='m-1 pointer' onClick={addReaction}>❤️</span>
            <span className='m-1 pointer' onClick={addReaction}>👀</span>
            <span className='m-1 pointer' onClick={addReaction}>😠</span>
          </div>

          <div onClick={showCommentInput}>
            <i className="fa-solid fa-comment"></i>
            <span> Leave a comment... </span>
          </div>
          <div className='pointer'>
            <i className="fa-solid fa-share me-2"></i>
            <span>Share</span>
          </div>


        </div>
        <hr className='my-2'/>
        {leaveComment && <div className="comment-input mb-3">
          <form onSubmit={submitComment}>
            <input ref={commentInput} type="text" placeholder='Leave your comment!' onChange={handleChange} className='p-2'/>
          </form>
        </div>}

        <div className="comments">
          {commentsPerPost.length > 0 && commentsPerPost.map((comment)=><Comment key={comment._id} singleComment={comment}/>)}
        </div>
      </div>
    </>
  )
}
