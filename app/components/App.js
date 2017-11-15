import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Popular from './Popular'
import Results from './Results'
import NotFound from './NotFound'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route exact path='*' component={NotFound} />
            {/* not found page
             <Route render={function() {
              return <p>Not found</p>
            }} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
