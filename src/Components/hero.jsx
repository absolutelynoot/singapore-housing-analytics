import HeaderAsset from '../assets/header-asset.png'

const hero = () => {
  return (
    <div className="container col-xl-12 col-xxl-12 px-lg-3 py-lg-5 px-3">
    <div className="row align-items-center g-lg-5 py-5 g-0">
      <div className="col col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 mb-3">Discover Your Dream Property with Lofty</h1>
        <p className="col-lg-10 fs-5">Lofty is the premier destination for home buyers and property investors looking to find their dream property. Our powerful analytics tools and expert insights give you the knowledge you need to make the best investment decisions. Whether you're looking for a new home for your family or an investment property to grow your portfolio, Lofty has everything you need. Start your search today and discover your perfect property with Lofty.</p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5 d-none d-lg-block">
        <img className="img-fluid" src={HeaderAsset}></img>
      </div>
    </div>
  </div>
  )
}

export default hero