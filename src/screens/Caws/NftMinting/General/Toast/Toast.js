import React from 'react'
import PropTypes from "prop-types"
import './_toast.scss'

const Toast = ({ icon, message }) => {
    return (
        <div className='d-flex align-items-start toast-element'>
            <span className='red-dot' />
            <img src={icon} className='px-2'alt='' />
            <div className='text-container'>
                {message}
            </div>
        </div>
    )
}

Toast.propTypes = {
    message: PropTypes.string,
    icon: PropTypes.string,
}

export default Toast;