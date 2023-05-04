import React, { useEffect, useState } from 'react';
import '../Styles/Userform.css'
import { Register } from './Register';
import { Login } from './Login';

export function Userform(props) {

    useEffect(()=>{
        props.setShowNavbar(false)
      },[props])

    const [toggleClicked, setToggleClicked] = useState(true)

    function switchLoginRegister() {
        setToggleClicked(!toggleClicked)
    }

    //End Functions

    return (
        <>
            <section id='main-page'>
                <div className="headers-container d-flex align-items-center">
                    <div className="headers mx-auto d-flex align-items-center justify-content-center">

                        <div className="main-heading d-inline-block ">
                        {toggleClicked ? <h1>REGISTER<br /><span>ONLINE</span></h1> : <h1>LOGIN<br /><span>NOW</span></h1>}

                            <div className="form-btns">
                                <button id="login-btn" className='text-white px-4 py-2' onClick={switchLoginRegister}>
                                    LOGING
                                </button>

                                <button id="register-btn" className=' px-4 py-2' onClick={switchLoginRegister}>
                                    REGISTER
                                </button>
                            </div>


                        </div>
                        <div className="main-logo d-inline-block">
                            <img src={`${require('../img/logo.jpg')}`} alt="main_logo" className="w-100" />
                        </div>

                    </div>
                </div>
                <div className="form-container">
                    <div className="form mx-auto">                  
                        {toggleClicked ? <Register loginUser={props.loginUser}/> : <Login error={props.error} loginUser={props.loginUser}/>}
                    </div>
                </div>

            </section>
            {/* {registerClicked && <Register />} */}
        </>
    )
}
