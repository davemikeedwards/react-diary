import React, { Fragment } from 'react'
import './App.css'

import HeaderRow from './components/HeaderRow'
import Calendar from './components/Calendar'

function App() {

  return (
    <Fragment>
      <HeaderRow />
      <Calendar />
    </Fragment>
  )
}

export default App