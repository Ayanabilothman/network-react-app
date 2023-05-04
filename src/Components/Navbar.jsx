import React, { useState } from 'react'
import '../Styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {userSelector} from '../Redux/Features/currentUserSlice'
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import { Alert } from './Alert';
import { useEffect } from 'react';
import Swal from "sweetalert2"; 

export function Navbar(props) {
  const user = useSelector(userSelector)
  
  const navigate = useNavigate()
  const [userPassword, setUserPassword] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: ''
  })

  const [error, setError] = useState('')
  const [successUpdate ,setSuccessUpdate] = useState(false)
  const [successDelete ,setSuccessDelete] = useState(false)
  const [followRequests ,setFollowRequests] = useState(0)

  const [dropDown, setDropDown] = useState(false)
  const [changePasswordForm, setChangePasswordForm] = useState(false)
  const [errorMessages, setErrorMessages] = useState({
    new_password: undefined,
    confirm_new_password: undefined
  })

  useEffect(()=>{
    if (Object.keys(user).length !== 0) {
      const requestsCount = user.follow_requests.length
      setFollowRequests(requestsCount)
    }
  },[user])

  function editState(updateFunction, key, value = '') {
    updateFunction(
      (oldState) => {
        return { ...oldState, [key]: value }
      }
    )
  }

  function setCurrentPass(e) {
    const value = e.target.value
    editState(setUserPassword, 'current_password', value)
  }

  function validatePassword(e) {
    const inputValue = e.currentTarget.value;
    const inputId = e.currentTarget.id;
  
    if (inputId === 'new_password') {
      editState(setUserPassword, inputId, inputValue)
      if (userPassword.confirm_new_password !== inputValue || user.confirm_new_password === '') {
        editState(setErrorMessages, 'confirm_new_password', "Password doesn't match!")
      } else {
        editState(setErrorMessages, 'confirm_new_password')
      }
    }

    if (inputId === 'confirm_new_password') {
      if (userPassword.new_password === inputValue) {
        editState(setErrorMessages, 'confirm_new_password')
        editState(setUserPassword, inputId, inputValue)
      } else {
        editState(setErrorMessages, 'confirm_new_password', "Password doesn't match!")
      }

    }
  }

  // function updateUserPassword(e) {
  //   const inputValue = e.currentTarget.value;
  //   const inputId = e.currentTarget.id;

  //   setUserPassword(
  //     (oldState) => {
  //       return { ...oldState, [inputId]: inputValue }
  //     }
  //   )
  // }


  function toggleDropDown() {
    setDropDown(!dropDown)
  }

  function openChangePasswordForm() {
    setChangePasswordForm(true)
    setDropDown(false)
  }

  async function editPassword(e) { 
    e.preventDefault()
    const {data} = await Axios.put('http://localhost:3002/change_password', userPassword, {headers:{token: localStorage.getItem('token')}})
    console.log(data)
    if (data.error) {
      setError(data.error)
    } else {
      setChangePasswordForm(false)
      setSuccessUpdate(true)
    }
  }

  async function deleteAccount(password) {
    const {data} = await Axios(
      {
        method: "delete",
        url: `http://localhost:3002/delete`,
        headers: {token: localStorage.getItem('token')},
        data: {password: password}
      }) 
    console.log(data)
    if (data.message) {
      navigate('/')
    } else if (data.error) {
      Swal.fire({
        title: 'Your password',
        input: 'password',
        text: `${data.error}`,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
          deleteAccount(password)
        }
      })
    }
  }

  function checkPassword() {
    Swal.fire({
      title: 'Your password',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        deleteAccount(password)
      }
    })

  }

  return (
    <>
      
      {successUpdate && <Alert message='Password updated successfully!' setSuccessUpdate={setSuccessUpdate}/>}
      {successDelete && <Alert message='Account deleted successfully!' setSuccessDelete={setSuccessDelete}/>}

      {changePasswordForm && <div id='edit-password-bg' className="top-0 bottom-0 start-0 end-0 position-fixed d-flex align-items-center justify-content-center">
        <div className="edit-password-form w-50 p-4 position-relative">

          <form onSubmit={editPassword}>
            <Form.Group className='mb-3'>

              <Form.Control
                type="password"
                id="password"
                placeholder='Current password'
                onChange = {setCurrentPass}
              />
              {/* {errorMessages.password && (<span className="invalid-feedback"> {errorMessages.password} </span>)} */}
            </Form.Group>

            <Form.Group className='mb-3'>

              <Form.Control
                type="password"
                id="new_password"
                placeholder='New password'
                onChange={validatePassword}
              />
              {errorMessages.new_password && (<span className="invalid-feedback"> {errorMessages.new_password} </span>)}
            </Form.Group>

            <Form.Group className='mb-3'>

              <Form.Control
                type="password"
                id="confirm_new_password"
                placeholder='Confirm new password'
                onChange={validatePassword}

              />
              {errorMessages.confirm_new_password && (<span className="invalid-feedback"> {errorMessages.confirm_new_password} </span>)}

            </Form.Group>

            {error && <span className="invalid-feedback"> {error} </span>}
            <div className="add-post-button">
              <button className='w-100 text-white btn' type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      }
      <nav className="navbar navbar-expand-lg position-fixed end-0 start-0 top-0">
        <div className="container">
          <Link className="navbar-brand mx-3" to="#">SOCIAL</Link>
          <form className="d-flex" role="search">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button id='search-btn' className="btn btn-outline-success" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/home">
                  <i className="fa-solid fa-house d-block mx-auto text-center"></i>
                  Home
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/followers">
                  <i className="fa-solid fa-people-arrows d-block mx-auto text-center"></i>
                  Followers
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/followings">

                  <i className="fa-solid fa-pager d-block mx-auto text-center"></i>
                  Following
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/home">
                  <i className="fa-solid fa-message d-block mx-auto text-center"></i>
                  Messages
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/home">
                  <div className='position-relative'>
                  <i className="fa-solid fa-bell d-block mx-auto text-center"></i>
                  {/* {followRequests > 0 && <div className='notification-alert position-absolute'>
                    {followRequests}
                  </div>} */}
                  </div>
                  Notifications
                </Link>
              </li>

            </ul>
          </div>
          <div className='position-relative'>
            <ul className="navbar-nav ms-3 text-center" onClick={toggleDropDown}>
              <li className="nav-item" id='userBtn'>
                <img src={user.image} alt="Profile_picture" className='me-2' />
                <strong className='me-1'>
                  {user.first_name}
                </strong>
                <i className="fa-solid fa-angle-down pointer"></i>
                {/* <Link className="nav-link" to="/login">Logout</Link> */}
              </li>
            </ul>
            {dropDown && <div className='dropDown position-absolute p-2'>
              <ul>
                <Link to={`/profile/${user._id}`}>See Profile</Link>
                <li onClick={openChangePasswordForm}>Change Password</li>
                <li onClick={checkPassword}>Delete Account</li>

              </ul>
            </div>}

          </div>


          <ul className="navbar-nav ms-3 text-center pointer" onClick={props.logout} >
            <li className="nav-item" id='logout-btn'>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </li>
          </ul>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-bars text-white fa-1x"></i>
          </button>
        </div>
      </nav>
    </>
  )
}
