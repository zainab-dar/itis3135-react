import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Introduction from './Introduction.jsx'

const container = document.getElementById('root')

if (!window._reactRoot) {
  window._reactRoot = createRoot(container)
}

window._reactRoot.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<App />}></Route>
          <Route path='/introduction' element={<Introduction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
