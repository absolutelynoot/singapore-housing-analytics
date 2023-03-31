import React from "react";
import { useEffect } from "react";
import Hero from "../Components/hero";
import FeaturedDatasets from "../Components/featuredDatasets";
import CardFeatures from "../Components/cardFeatures";
import HdbCardImg from "../assets/hdb-card.jpg";
import PpCardImg from "../assets/pp-card.jpg";
import { 
  faChartLine, 
  faLocationDot, 
  faFileContract, 
  faTrainSubway,
  faTreeCity,
  faDatabase,
  faChartArea,
  faNewspaper
 } from "@fortawesome/free-solid-svg-icons";
import IconGrid from "../Components/iconGrid";

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
      "Private Property Analytics (Coming soon)",
      "Compare prices, resale volume of flats and ammenities",
      "#cards",
    ],
  ];

  const iconGridData = [
    [faChartLine, "Supply and Demand", "Examine how the supply and demand of flats affect the housing market in Singapore."],
    [faFileContract, "Lease Analysis", "Evaluate the impact of remaining lease on the housing market in Singapore."],
    [faTrainSubway, "Transportation Proximity Analysis", "Study how proximity to transportation nodes impacts housing prices in Singapore"],
    [faTreeCity, "Amenities Impact Analysis", "Utilize predictive analysis techniques to determine if news announcements of new amenities impact resale prices of HDBs in Singapore."],
    [faChartArea, "Visualization", "Use D3.js and OpenStreetMap API to create interactive and visually appealing visual analytics dashboard."],
    [faNewspaper, "Data Sources", "Incorporate data sources such as News API, Google RSS, and social media to provide up-to-date information about the Singapore housing market."],

    
  ];

  return (
    <>
      <Hero />
      <FeaturedDatasets />
      <div className="container px-4 py-5">
        <h2 className="pb-2">
          Choose between HDB and Private Property
        </h2>
        <div className="row row-cols-1 row-cols-lg-2 align-items-stretch g-4 py-5  mb-5" id="cards">
          {cardData.map((card) => {
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

        <h2 class="pb-2">Analyse Singapore Housing market with Lofty</h2>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3  g-4 py-5">
            {iconGridData.map((icon) => {
                return (
                    <IconGrid icon={icon[0]} igTitle={icon[1]} igDesc={icon[2]}/>
                )
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
