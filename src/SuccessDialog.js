import React from 'react';

const SuccessDialog = ({ message }) => {
  return (
    <div style={{ border: '1px solid green', padding: '20px', background: '#e0ffe0' }}>
      <h3>Success!</h3>
      <p>{message}</p>
    </div>
  );
};

export default SuccessDialog;
