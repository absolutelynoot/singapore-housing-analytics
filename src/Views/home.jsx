import React from 'react'
import { useEffect } from 'react';


const Home = () => {

  useEffect(() => {
    document.title = 'Lofty | Home';
  }, []);

  return (
    <div>home</div>
  )
}

export default Home