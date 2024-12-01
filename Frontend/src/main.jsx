import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"

import AuthContext from './context/authContext.js'
import App from './App.jsx'
import './index.scss'


const Main = () => {

  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthContext.Provider value={{isLogged, setIsLogged}}>
         <StrictMode>
            <BrowserRouter>
              <App></App>
            </BrowserRouter>
          </StrictMode>
    </AuthContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <Main></Main>
)
