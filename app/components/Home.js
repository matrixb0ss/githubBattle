import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render () {
    return (
      <div className='home-container'>
        <h1 className='welcome'>Github Battle</h1>
        <h3 className='qoute'>Battle your friends for fun!</h3>
        <Link className='button' to='/battle'>
          Battle
        </Link>
     </div>
    )
  }
}

export default Home;
