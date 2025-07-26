import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom'
import NewsPage from './pages/NewsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import JournalPage from './pages/JournalPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import HomePage from './pages/HomePage.jsx'

const RouterLayout=()=>{
  return(
    <App>
      <ScrollRestoration/>
      <Outlet/>
    </App>
  )
}

const router=createBrowserRouter([
  {
    path:"/", 
    element:<RouterLayout/>,
    children:[
      {path:"/", element:<HomePage/>},
      {path:"/news", element:<NewsPage/>},
      {path:"/about", element:<AboutPage/>},
      {path:"/journal", element:<JournalPage/>},
      {path:"/Dashboard", element:<Dashboard/>},
  
    ]

    
  }])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  
)

