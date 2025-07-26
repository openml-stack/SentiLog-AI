import React, { useEffect } from 'react'

const AboutPage = () => {
   // tab title
          useEffect(()=>{
          document.title='SentiLogAI-About Us '
          },[])

  return (
    <div className=''>AboutPage</div>
  )
}

export default AboutPage