import React from 'react'

const footer = () => {
  return (
    <div className="container-fluid bg-light">
    <footer className="py-3 my-5">
      <ul className="nav justify-content-center border-top py-3 mb-3">
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">HDB Analysis</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Private Property Analysis</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
      </ul>
      <p className="text-center text-muted">© Lofty 2023</p>
    </footer>
  </div>
  )
}

export default footer