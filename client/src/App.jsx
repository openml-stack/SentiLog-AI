import React, { createContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState } from 'react'

export const ThemeContext=createContext()

const App = ({children}) => {
  const [mode, setMode]=useState('light')

  useEffect(()=>{
    const currentMode=localStorage.getItem('mode')
    if(currentMode){
      setMode(currentMode)
      document.body.className=currentMode;
    }
  },[])


  return (
    <div className={`${mode==='light'? 'bg-white text-black': 'bg-gradient-to-br from-[#111133] via-[#2a2a49] to-[#090949] text-slate-300'}  min-h-screen flex flex-col`}>
    <Navbar mode={mode} setMode={setMode}/>
    <main className="flex-1">
      <ThemeContext value={mode}>
          {children}
      </ThemeContext>
        
      
    </main>
    <Footer mode={mode} setMode={setMode}/>
  </div>
  )
}

export default App