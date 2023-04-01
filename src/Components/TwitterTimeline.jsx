import { Timeline } from "react-twitter-widgets";
import React, { useState } from "react";
import TwitterLoadingPlaceholder from "./TwitterLoadingPlaceholder";

const TwitterTimeline = ({ screenName }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <TwitterLoadingPlaceholder />}
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: screenName,
        }}
        options={{
          height: "800",
        }} onLoad={handleLoad}
      />
    </>
  );
};

export default TwitterTimeline;
