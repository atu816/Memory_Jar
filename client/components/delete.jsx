import React from 'react';
import Server from '../fetchMethods.js';

const Delete = (props) => {
  return (
    <span
      id='delete'
      onClick={() => {
        console.log('Firing delete after clicking button');
        Server.deleteFetch(props.state, props.memory);
        Server.syncDB(props.update);
        props.deleteMemory();
        document.getElementById('memory-event').innerText = '';
        document.getElementById('memory-date').innerText = '';
        const memoryBox = document.getElementById('memory-box')
        memoryBox.lastChild.style.visibility = 'hidden';
        // Check what props.update is, maybe wrong ref
        Server.syncDB(props.update);
      }
      }
    >
      delete</span>
  )
}


export default Delete;