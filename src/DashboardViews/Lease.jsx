import StackedBarChart from "../Components/StackedBarChartWithFilterFlatType"
import LeaseSwarmPlot from "../Components/SwarmPlotLeaseByTown"


const Lease = () => {
  return (
    <>
      <div className="container mb-5">
        {/* <StackedBarChart /> */}
      </div>
      <div className="container mb-5">
        <LeaseSwarmPlot />
      </div>
    </>
  )
}

export default Lease