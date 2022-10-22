import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className='z-30 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70' onClick={props.onClick}></div>,
    document.getElementById('overlays')
  );
};

export default Backdrop;
