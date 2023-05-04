import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updateComment } from '../Redux/Features/commentsSlice';
import { userSelector } from '../Redux/Features/currentUserSlice'
import '../Styles/Comments.css'

export function Comment(props) {
    const user = useSelector(userSelector)
    const comment = props.singleComment
    const commentOwner = comment.created_by._id === user._id
    const commentId = comment._id
    const postId = comment.post_id
    const timestamp = new Date(comment.updatedAt).toString().slice(4, 24);
    const dispatch = useDispatch()

    const [updatedComment, setUpdatedComment] = useState({
        content: "",
        comment_id: commentId
    })
    const [editCommentForm, setEditCommentForm] = useState(false)

    function openEditComment() {
        setEditCommentForm(true)
    }

    function handleChange(e) {
        setUpdatedComment((previousState) => {
            return {
                ...previousState,
                content: e.target.value
            }
        })
    }

    function editComment(e) {
        e.preventDefault()
        if (updatedComment.content.length > 0) {
            dispatch(updateComment(updatedComment))
            setEditCommentForm(false)
        }
    }

    function removeComment() {
        dispatch(deleteComment([
            { comment_id: commentId },
            { post_id: postId }
        ]))
    }

    return (
        <>
            {editCommentForm &&
                <div id='edit-comment-bg' className="top-0 bottom-0 start-0 end-0 position-fixed d-flex align-items-center justify-content-center">
                    <div className="edit-comment-form w-50 px-5 py-3 position-relative">

                        <form onSubmit={editComment}>
                            <div className="add-post-text position-relative">
                                <textarea defaultValue={comment.content} rows="5" placeholder='Update comment' className='py-2' onChange={handleChange}></textarea>
                                <div className="add-post-emoji position-absolute bottom-0 end-0 m-3 pointer" >
                                    <i className="fa-solid fa-face-smile text-white"></i>
                                </div>
                            </div>
                            <div className="add-post-button">
                                <button className='w-100 text-white btn' type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>}

            <div className="comment d-flex mb-3">
                <div className='img-comment-div ms-2'>
                    <img src={comment.created_by.image} alt="Profile_picture" className='d-block' />
                </div>
                <div className='text-comment-div p-2 ms-2 position-relative'>
                    <strong>{comment.created_by.first_name} {comment.created_by.last_name}</strong>
                    <span> - </span>
                    <small className='small-font'>{timestamp}</small>
                    <p className='mb-1 ps-2'>{comment.content}</p>
                    {commentOwner &&
                        <div className="actions position-absolute end-0 top-0 p-2">
                            <div className="edit-comment mx-1 small-font d-inline-block" onClick={openEditComment}>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </div>

                            <div className="delete-comment mx-2 small-font d-inline-block" onClick={removeComment}>
                                <i className="fa-regular fa-trash-can"></i>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    )
}
