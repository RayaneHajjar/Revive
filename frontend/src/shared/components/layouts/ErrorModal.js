import React from 'react';

import Modal from './Modal';
import Button from '../forms/Button';

const ErrorModal = props => {
  return (
    <Modal
      onClose={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
