import LineChart from "../Components/LineChartHDBTransactions"
import LineChart2 from "../Components/lineChartRoomTown"
import BarChart from "../Components/BarChartHDBAveragePriceSQM"
import Scorecards from "../Components/Scorecards"
import Form from "../Components/pricePredict"

const Pricing = () => {
  return (
    <div>
      <Scorecards/>

      <div className="mb-5">
        <LineChart2 />
      </div>

      <div>
        <h1 className="fw-semibold">Transaction over Time</h1>
        <LineChart />
      </div>

      <div>
        <h1 className="fw-semibold">Town vs Average Square Meter</h1>
        <BarChart />
      </div>

      <div className="mb-5">
        <h1 className="fw-semibold">Predictive Analysis of Average House Price</h1>
        <p>Please enter information below and click submit</p>
        <Form />
      </div>
    </div>


  )
}

export default Pricing