import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Routing from './Components/Routing.jsx'
import { Provider } from 'react-redux'
import mystore from './redux/mystore.js'

createRoot(document.getElementById('root')).render(
  <Provider store={mystore}>  
  <BrowserRouter>
      <Routing></Routing>
  </BrowserRouter>
  </Provider>
)
