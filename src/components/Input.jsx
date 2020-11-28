import React, { useState } from 'react';
import classNames from 'classnames';
import '../assets/styles/components/Input.scss';

const Input = (props) => {
  const { id, label } = props;
  const [field, setValue] = useState({
    hasContent: false,
    [id]: '',
  });

  const handleInput = ({ target }) => {
    const { value } = target;
    setValue({
      ...field,
      [target.id]: value,
      hasContent: Boolean(value),
    });
  };
  const inputClass = classNames('input-name', { hasContent: field.hasContent });

  return (
    <div>
      <label htmlFor={id} className='input-wrapper'>
        <input type='text' id={id} className='input' onChange={handleInput} />
        <span className={inputClass}>
          {' '}
          {label}
        </span>
      </label>
    </div>
  );
};
export default Input;

