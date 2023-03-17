
const CardFeatures = ({cardImg, cardTitle, cardDesc, route}) => {
  return (
    
      <div classNameName="col">
        <a href={`${route}`} className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow" style={{backgroundImage:`url(${cardImg})`}}>
        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-2">
            <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{cardTitle}</h3>
            <ul class="d-flex list-unstyled mt-auto">
              <li class="d-flex align-items-center me-3">
                <div>image here</div>
                <small>Earth</small>
              </li>
              <li class="d-flex align-items-center">
                <div>image here</div>
                <small>3d</small>
              </li>
            </ul>
          </div>
        </a>
      </div>
    

      
  )
}

export default CardFeatures