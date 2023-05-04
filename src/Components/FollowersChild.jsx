import React from 'react'

export function FollowersChild(props) {
    const user = props.user
    console.log(user)

    function openProfile() {

    }
    return (
        <>
            <div className="col-3">
                <div className='follow-request-div d-flex align-items-center p-2 mb-3 '>
                    <div className='img-side-div me-3' onClick={openProfile}>
                        <img src={user.image} alt="Profile_picture" />
                    </div>
                    <div className='user-side-div'>
                        <strong className='h6' onClick={openProfile}>{user.first_name} {user.last_name}</strong>
                        <div className="mutual-followers">
                            <div>
                                {user.title}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
