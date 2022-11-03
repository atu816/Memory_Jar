import React from 'react';

const Delete = (props) => {
  return (
    <span
      id='delete'
      onClick={props.deleteMemory}
    >
      delete</span>
  )
}

export default Delete;