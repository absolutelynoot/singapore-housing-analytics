import React from 'react'
import { useEffect } from 'react';
import Hero from '../Components/hero';
import FeaturedDatasets from '../Components/featuredDatasets';

const Home = () => {

  useEffect(() => {
    document.title = 'Lofty | Home';
  }, []);

  return (
    <>
      <Hero/>
      <FeaturedDatasets/>
    </>
    
  )
}

export default Home