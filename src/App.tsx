import Teste from 'components/Teste'
import React from 'react'

export interface AppProps {
  children?: React.ReactNode
}

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      Hello
      <div>
        <Teste />
      </div>
    </div>
  )
}

export default App
