import React, { Component } from 'react';

const Edit = (props) => {
  return (
    <span
      id='edit'
      onClick={() => props.editMode()}
    >
      edit
    </span>
  )
}

export default Edit;