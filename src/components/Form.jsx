import React from 'react';
import '../assets/styles/components/Form.scss';

const Form = ({ children }) => {
  return (
    <form className='form'>
      { children }
    </form>
  );
};

export default Form;
