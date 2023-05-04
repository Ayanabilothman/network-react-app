import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'
import '../Styles/Cropper.css'

export default function Cropper(props) {
    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState(null)

    const onClose = () => {
        setPreview(null)
    }

    const onCrop = (view) => {
        setPreview(view)
    }

    const closeCropper = () => {
        props.setCropper(false)
    }

    const uploadImage = () => {
        props.setUser((previousState)=>{
            return { ...previousState, image: preview }
        })
        props.setImageIsUploaded(true)
        closeCropper()
    }

    return (
        <div id ='cropper' className="top-0 bottom-0 start-0 end-0 position-fixed d-flex align-items-center justify-content-center">
            <div className='d-flex align-items-center vh-100 w-75'>
                <div className='w-100 bg-light-black px-3 py-5 position-relative mx-auto'>
                    <div className='d-flex justify-content-evenly align-items-center'>
                        <Avatar
                            width={300}
                            height={300}
                            onClose={onClose}
                            onCrop={onCrop}
                            src={src}
                        />
                        <img src={preview} className='d-inline-block' />
                    </div>

                    <div className='position-absolute top-0 end-0 m-3 pointer' onClick={closeCropper}>
                        <i className="fa-solid fa-circle-xmark text-white fa-2x"></i>
                    </div>

                    <button onClick={uploadImage} className='btn btn-success w-75 my-3 mx-auto d-block'>Done</button>
                </div>

            </div>
        </div>
    )
}
