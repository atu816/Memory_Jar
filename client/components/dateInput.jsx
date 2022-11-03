import React, { Component } from 'react';

const DateInput = (props) => {
  return <input
    required id='memory-date'
    type='date'
    onChange={(e) => {
      console.log('date is changing', e.target.value)
      props.updateDate(e.target.value)
    }}>
  </input>
}

export default DateInput;