import LineChart from "../Components/LineChartHDBTransactions"
import LineChart2 from "../Components/lineChartRoomTown"
import BarChart from "../Components/BarChartHDBAveragePriceSQM"
import Scorecards from "../Components/Scorecards"

const Pricing = () => {
  return (
    <div>
      <Scorecards/>

      <div className="container mb-5">
        <LineChart2 />
      </div>

      <div className="container mb-5">
        <LineChart />
      </div>

      <div className="container mb-5">
        <BarChart />
      </div>
    </div>


  )
}

export default Pricing