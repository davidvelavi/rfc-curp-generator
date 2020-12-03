import React, { useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import '../assets/styles/components/Input.scss';
import { setFieldValue } from '../actions';

const Input = (props) => {
  const { id, label, dataUser } = props;
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

    props.setFieldValue({
      ...dataUser,
      [target.id]: value,
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

const mapDispatchToProps = {
  setFieldValue,
};
export default connect(null, mapDispatchToProps)(Input);

