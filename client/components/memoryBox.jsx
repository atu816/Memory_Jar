import React, { Component } from 'react';
import ModifyContainer from './containers/ModifyContainer.jsx';

const MemoryBox = (props) => {

    return (
      <div id='memory-box'>
        <h2 id='memory-event'>
        </h2>
        <h4 id='memory-date'>
        </h4>
        <ModifyContainer />
      </div >
    )
  
}

export default MemoryBox;