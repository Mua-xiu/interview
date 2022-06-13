import React from 'react';
import './Login.scss';

export default function Login(props) {
  function start() {
    props.history.push("/main");
  }
  return (
    <div className='main'>
      <div className='start' onClick={start}>
        Start App
      </div>
    </div>
  )
}
