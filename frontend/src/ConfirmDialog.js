import React from 'react';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={{ border: '1px solid gray', padding: '20px', background: '#f8f8f8' }}>
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default ConfirmDialog;
