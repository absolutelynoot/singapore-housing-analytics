import SimpleMap from "../Components/geo";
import NewMap from "../Components/houseMap";
import CloroplethTableau from "../Components/CloroplethTableau";


const Location = () => {
  return (
    <>
      <div class="mb4">
        <h1 class="mb-3 fw-bold">Location Analysis (Interactive)</h1>
        <div class="alert alert-info" role="alert">
          Click on the markers to find out more about the location
        </div>
        <SimpleMap />
      </div>
      <br></br>
      <div class="mb4">
        <h1 class="mb-3 fw-bold">Average Resale Price Cloropleth Map</h1>
        <CloroplethTableau />
      </div>

      <br></br>
      <div class="mb4">
        <h1 class="mb-3 fw-semibold">Search for your desired location</h1>
        <NewMap />
      </div>
    </>
  );
};

export default Location;
