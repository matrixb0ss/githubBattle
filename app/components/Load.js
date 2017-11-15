import React from 'react'
import ReactLoading from 'react-loading'

var styles = {
    textAlign: 'center',
};
  function Load(props) {
    return (
      <div>
        <ReactLoading style={textAlign: 'center'} type='cubes' color='#444' />
      </div>
    )
  }

export default Load;
