import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { HeroresApp } from './HeroresApp'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      
      <HeroresApp />
    </BrowserRouter>
  </React.StrictMode>,
)
