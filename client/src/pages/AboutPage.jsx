import React, { useEffect } from 'react'

const AboutPage = () => {
   // tab title
          useEffect(()=>{
          document.title='SentiLog-About Us '
          },[])

  return (
    <div className=''>AboutPage</div>
  )
}

export default AboutPage