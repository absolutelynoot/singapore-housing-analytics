import SimpleMap from "../Components/geo";
import NewMap from "../Components/houseMap";
import CloroplethTableau from "../Components/CloroplethTableau";

const Location = () => {
  return (
    <>
      <div class="mb4">
        <h1 class="mb-3">Location Analysis (Interactive)</h1>
        <h4>Click on the markers to find out more about the location</h4>
        <SimpleMap />
      </div>
      <br></br>
      <div class="mb4">
        <h1 class="mb-3">Average Resale Price Cloropleth Map</h1>
        <CloroplethTableau />
      </div>

      <br></br>
      <div class="mb4">
        <h1 class="mb-3">Location Analysis (Interactive)</h1>
        <h4>Click on the markers to find out more about the location</h4>
        <NewMap />
      </div>

    </>
  );
};

export default Location;
