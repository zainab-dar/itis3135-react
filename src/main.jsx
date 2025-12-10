import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Introduction from './pages/Introduction.jsx'
import Contract from './pages/Contract.jsx' 
import Studentlist from './pages/StudentList.jsx'
import './styles/default.css';


const container = document.getElementById('root')

if (!window._reactRoot) {
  window._reactRoot = createRoot(container)
}

window._reactRoot.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<App />} />
          <Route path='introduction' element={<Introduction />} />
          <Route path='contract' element={<Contract />} />
          <Route path='studentlist' element={<Students />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)