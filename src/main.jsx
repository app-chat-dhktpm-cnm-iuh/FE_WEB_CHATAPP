import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './Login/Login.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
