import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router'
import {ToastContainer} from 'react-toastify'


const App = () => {
  return (
    <>
    <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="colored"/>
    
      <Outlet/>
    </>
  )
}

export default App
