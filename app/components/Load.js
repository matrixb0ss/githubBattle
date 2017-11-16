import React from 'react'
import ReactLoading from 'react-loading'

const styles = {
    textAlign: 'center',
    width: '30px',
    heigth: '30px',
    margin: '0 auto'
};
  function Load(props) {
    return (
      <div>
        <ReactLoading style={styles} type='cubes' color='#333' />
      </div>
    )
  }

export default Load;
