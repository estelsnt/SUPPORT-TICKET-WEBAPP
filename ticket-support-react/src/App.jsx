import React from 'react'
import Routes from './pages/Routes'
import Context from './context/Context'

function App() {

  return (
    <Context>
      <Routes />
    </Context>
  )
}

export default App