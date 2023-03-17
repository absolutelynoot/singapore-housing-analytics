import React from "react";
import { useEffect } from "react";
import Hero from "../Components/hero";
import FeaturedDatasets from "../Components/featuredDatasets";
import CardFeatures from "../Components/cardFeatures";
import HdbCardImg from "../assets/hdb-card.jpg";
import PpCardImg from "../assets/pp-card.jpg";

const Home = () => {
  useEffect(() => {
    document.title = "Lofty | Home";
  }, []);

  const cardData = [
    [
      HdbCardImg,
      "HDB Housing Analytics",
      "Compare prices, resale volume of flats and ammenities",
      "/hdb",
    ],
    [
      PpCardImg,
      "Private Property Analytics",
      "Compare prices, resale volume of flats and ammenities",
      "/private_property",
    ],
  ];

  return (
    <>
      <Hero />
      <FeaturedDatasets />
      <div className="container px-4 py-5">
        <h2 className="pb-2">
          Discover your dream property with analytics
        </h2>
        <div className="row row-cols-1 row-cols-lg-2 align-items-stretch g-4 py-5">
          {cardData.map((card, index) => {
            return (
              <CardFeatures
                cardImg={card[0]}
                cardTitle={card[1]}
                cardDesc={card[2]}
                route={card[3]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
