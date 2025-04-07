import React from 'react'
import MapView from './components/MapView'
import { FeaturesProvider } from './context/FeaturesContext'
import './App.css'

function App() {
  return (
    <FeaturesProvider>
      <div style={{ height: '100vh' }}>
        <MapView />
      </div>
    </FeaturesProvider>
  )
}

export default App
