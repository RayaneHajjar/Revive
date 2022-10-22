import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

const ModalOverlay = props => {
    const content = (
        <div
            className={`z-30 fixed bg-white rounded-md shadow-xl top-15vh w-80vw left-10vw laptop:left-30vw laptop:w-40vw max-h-70vh scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-green scrollbar-track-gray-50 overflow-y-auto ${props.className}`}
            style={props.style}
        >
            {/* <header
                className={`w-full p-6 bg-brown text-white rounded-t-md ${props.headerClass}`}
            >
                <h2>{props.header}</h2>
            </header> */}
            {/* <form
                onSubmit={
                    props.onSubmit
                        ? props.onSubmit
                        : (event) => event.preventDefault()
                }
            > */}
                <div className={`p-6 ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`p-6 ${props.footerClass}`}>
                    {props.footer}
                </footer>
            {/* </form> */}
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('overlays'));
};

const Modal = props => {
    return (
      <>
        {props.show && <Backdrop onClick={props.onClose} />}
        <CSSTransition
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames={{
            enter: '-translate-y-40 opacity-0',
            enterActive: 'translate-y-0 opacity-100 transition-all duration-200',
            exit: 'translate-y-0 opacity-100',
            exitActive: '-translate-y-40 opacity-0 transition-all duration-200',
          }}
        >
            <ModalOverlay {...props} />
        </CSSTransition>
      </>
    );
  };

export default Modal;