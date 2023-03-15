import React from 'react'
import React, { useEffect } from 'react';


const Home = () => {

  useEffect(() => {
    document.title = 'Lofty | Home';
  }, []);

  return (
    <div>home</div>
  )
}

export default Home