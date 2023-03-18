import LineChart from "../Components/LineChartHDBTransactions"
import BarChart from "../Components/BarChartHDBAveragePriceSQM"

const Pricing = () => {
  return (
    <div>
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