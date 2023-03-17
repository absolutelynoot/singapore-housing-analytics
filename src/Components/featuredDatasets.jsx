import React from 'react'
import DataGovLogo from '../assets/data-gov-logo.png'
import HdbLogo from '../assets/hdb-logo-full.png'
import UraLogo from '../assets/ura-logo-full.png'
import LtaLogo from '../assets/lta-logo.png'



const FeaturedDatasets = () => {
  return (
    <div className="container">
        <div className="d-flex justify-content-center">Lofty uses combination of datasets and API</div>
        <div className="d-flex-column d-lg-flex justify-content-center py-3">
          <div className="px-5 py-3 text-center "><img className="datasets-logo" src={HdbLogo}/></div>
          <div className="px-5 py-3 text-center"><img className="datasets-logo" src={UraLogo}/></div>
          <div className="px-5 py-3 text-center"><img className="datasets-logo" src={DataGovLogo}/></div>
          <div className="px-5 py-3 text-center"><img className="datasets-logo" src={LtaLogo}/></div>
        </div>
        

    </div>
  )
}

export default FeaturedDatasets