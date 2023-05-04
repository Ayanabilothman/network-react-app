import React, { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'

export function Login(props) {
  const isMounted = useRef(false);
  const navigator = useNavigate()

  //Start State
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [errorMessages, setErrorMessages] = useState({
    email: undefined,
    password: undefined
  })


  const [databaseError, setdatabaseError] = useState('');

  const [isLoading, setisLoading] = useState(false);

  //End State

  //Start Functions
  function editState(updateFunction, key, value = '') {
    updateFunction(
      (oldState) => {
        return { ...oldState, [key]: value }
      }
    )
  }

  function saveUser(e) {
    const inputValue = e.currentTarget.value;
    const inputId = e.currentTarget.id;
    setUser(
      (oldState) => {
        return { ...oldState, [inputId]: inputValue }
      }
    )
  }

  async function submitUser(e) {
    e.preventDefault();
    props.loginUser(user)
  }

  return (
    <>
      {/*Start Bootstrap React Form*/}
      <Form className='position-relative' onSubmit={submitUser}>
        <div className="tech pt-3 pb-4">
          <div className="inputs-groups">
            {/* Email */}
            <Form.Group className='mb-3 mt-5'>
              <Form.Control
                type="email"
                id="email"
                autoComplete='off'
                placeholder='Email'
                onChange={saveUser}
              />
              {errorMessages.email && (<span className="invalid-feedback"> {errorMessages.email} </span>)}
            </Form.Group>
            {/* Password */}
            <Form.Group className='mb-3'>

              <Form.Control
                type="password"
                id="password"
                placeholder='Password'
                onChange={saveUser}
              />
              {errorMessages.password && (<span className="invalid-feedback"> {errorMessages.password} </span>)}
            </Form.Group>

            {props.error && (<span className="invalid-feedback"> {props.error} </span>)}

            <Button id="register" type="submit" className='d-block ms-auto px-5 py-2'>
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'LOGIN'}
            </Button>
          </div>


        </div>
      </Form>
      {/*End Bootstrap React Form*/}
    </>
  )
}
