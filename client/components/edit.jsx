import React, { Component } from 'react';

const Edit = (props) => {
  return (
    <span
      id='edit'
      onClick={props.editMemory}
    >
      edit
    </span>
  )
}

export default Edit;