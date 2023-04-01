import SimpleMap from "../Components/geo";
import CloroplethTableau from "../Components/CloroplethTableau";

const Location = () => {
  return (
    <>
      <div class="mb4">
        <h1 class="mb-3">Location Analysis (Interactive)</h1>
        <SimpleMap />
      </div>

      <div class="mb4">
        <h1 class="mb-3">Average Resale Price Cloropleth Map</h1>
        <CloroplethTableau />
      </div>

    </>
  );
};

export default Location;
