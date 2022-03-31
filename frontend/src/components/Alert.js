import React from 'react'
import {Toast} from 'react-bootstrap'
function Alert({alert}) {
  return (
    <>
    {alert && (
         <Toast className='fixed bottom-0 m-3 right-0 bg-gray-200 animate-bounce '>
         <Toast.Header className={`bg-${alert.type} text-white`}>
           <strong className={`me-auto`}>{alert.title}!</strong>
           <small>just now</small>
           
         </Toast.Header>
         <Toast.Body className='font-Lora text-xs'>{alert.msg}</Toast.Body>
       </Toast>
    )}
    </>
  )
}

export default Alert