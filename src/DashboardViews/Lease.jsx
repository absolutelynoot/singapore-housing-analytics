import Scorecards from "../Components/Scorecards"
import StackedBarChart from "../Components/StackedBarChartWithFilterFlatType"
import LeaseSwarmPlot from "../Components/SwarmPlotLeaseByTown"


const Lease = () => {
  return (
    <div style={{height:"1200px"}}>
      <Scorecards/>
      <div className="mb-5 h-50">
        <StackedBarChart />
      </div>
      <div className="mb-5">
        <h3 className="fw-semibold">Swarm Plot of price against Lease Remaining (Years)</h3>
        <LeaseSwarmPlot />
      </div>
    </div>
  )
}

export default Lease