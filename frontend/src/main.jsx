import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router"
import {Toaster} from "react-hot-toast"
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <div className="min-h-screen bg-gradient-to-r from-[#94BBE9] via-[#EEAECA] to-[#94BBE9] ">
        <BrowserRouter>
        <Toaster />
          <App />
         </BrowserRouter>
      </div>
   
  </StrictMode>,
)
