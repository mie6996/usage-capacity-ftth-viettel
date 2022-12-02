import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable={false}
      pauseOnVisibilityChange
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  );
};

export default Toast;
