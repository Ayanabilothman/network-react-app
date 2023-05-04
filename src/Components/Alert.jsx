import React from 'react'

export function Alert(props) {

    function close() {
        props.setSuccessUpdate(false)
        props.setPostAdded(false)
        props.setSuccessDelete(false)
    }
    return (
        <>
            <div id="alert" className='p-3 d-flex align-items-center justify-content-between position-fixed m-4 bottom-0 start-0'>
                <p className='m-0'>
                    {props.message}
                </p>
                <i className="fa-solid fa-xmark pointer ms-4" onClick={close}></i>
            </div>
        </>
    )
}
