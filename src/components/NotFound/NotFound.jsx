import React from 'react'
import NotFoundImg from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='container flex justify-center items-center mt-3'>
      <img src={NotFoundImg} alt="error 404" />
    </div>
  )
}
