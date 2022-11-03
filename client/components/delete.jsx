import React from 'react';
import Server from '../fetchMethods.js';

const Delete = (props) => {
  return (
    <span
      id='delete'
      onClick={() => {
        Server.deleteFetch(props.state, props.memory);
        props.deleteMemory;
        document.getElementById('memory-event').innerText = '';
        document.getElementById('memory-date').innerText = '';
        const memoryBox = document.getElementById('memory-box')
        memoryBox.lastChild.style.visibility = 'hidden';
        //.removeChild(document.getElementById('#modify-container'))
        Server.syncDB(props.update);
      }
      }
    >
      delete</span>
  )
}


export default Delete;