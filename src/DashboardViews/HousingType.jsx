import HouseTypesTableau from '../Components/HouseTypesTableau'
import Scorecards from "../Components/Scorecards"


const HousingType = () => {
  return (
    <div>
      <h1 className="mb-3 fw-bold">Housing Type Analysis</h1>
      <Scorecards/>
      <HouseTypesTableau/>
    </div>
  )
}

export default HousingType