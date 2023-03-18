import React from 'react'

const Header = ({headerImage, headerText, headerDesc, logo}) => {
  return (
    <>
    <div className="header-img d-none d-sm-block" style={{backgroundImage:`url(${headerImage})`}}>
    </div>
        <div className="container-fluid container-md bg-opacity-90 shadow-sm mt-sm-0 my-md-5 bg-light d-flex rounded-top justify-content-start align-items-center px-5" style={{height:`160px`}}>
          <img className="header-logo align-self-center me-4 d-none d-sm-block" src={logo}></img>
          <div className="text-start">
            <h2 className="col display-md-1 display-5 fw-semibold">{headerText}</h2>
            <p>{headerDesc}</p>
          </div>
        </div>
    </>
  )
}

export default Header