import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconGrid = ({icon, igTitle, igDesc}) => {
  return (
    <div class="col d-flex align-items-start">
      <FontAwesomeIcon className="me-2 fs-2 me-4" icon={icon}  />
      <div>
        <h3 class="fw-semibold mb-0 fs-4">{igTitle}</h3>
        <p>{igDesc}</p>
      </div>
    </div>
  );
};

export default IconGrid;
