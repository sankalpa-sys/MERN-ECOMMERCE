import React from 'react'

function Alert({alert}) {
  return (
    <>
    {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show flex justify-center items-center h-14`} role="alert">
        <strong className="first-letter:uppercase">{alert.title}!! </strong> &nbsp; {alert.msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    )}
    </>
  )
}

export default Alert