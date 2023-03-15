import { useEffect } from "react";


import Header from "../Components/header";
import PpHeaderImage from '../assets/pp-header.jpg'
import Uralogo from '../assets/ura-logo.png'
import BarChart from "../Components/barChart";

const PrivateProperty = () => {

  useEffect(() => {
    document.title = 'Lofty | Private Housing Analytics';
  }, []);

  const headerText = "Private Property Analytics";
  const headerDesc = "Compare prices of private properties";

  return (
    <>
      <Header headerImage={PpHeaderImage} headerText={headerText} headerDesc={headerDesc} logo={Uralogo}/>
      <div className="container py-5" >
        <BarChart/>
      </div>
    </>
  )
}

export default PrivateProperty