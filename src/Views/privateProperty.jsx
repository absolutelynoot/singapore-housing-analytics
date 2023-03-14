import Header from "../Components/header";
import PpHeaderImage from '../assets/pp-header.jpg'
import Uralogo from '../assets/ura-logo.png'


const PrivateProperty = () => {

  const headerText = "Private Property Analytics";
  const headerDesc = "Compare prices of private properties";

  return (
    <>
      <Header headerImage={PpHeaderImage} headerText={headerText} headerDesc={headerDesc} logo={Uralogo}/>
    </>
  )
}

export default PrivateProperty