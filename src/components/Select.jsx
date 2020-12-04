import React from 'react';
import { connect } from 'react-redux';
import { setFieldValue } from '../actions';
import '../assets/styles/components/Select.scss';

const Select = (props) => {
  const { id, label, options, setFieldValue, dataUser } = props;

  const handleSelect = ({ target }) => {
    setFieldValue({
      ...dataUser,
      [target.id]: target.value,
    });
  };

  return (
    <section className='select'>
      <label htmlFor={id} className='select-label'>
        {' '}
        {label}
        {' '}
      </label>
      <select id={id} onChange={handleSelect} className='dropdown'>
        <option>Selecciona un estado</option>
        {
          options.map((option, index) => (<option value={index} key={index}>{option}</option>))
        }
      </select>
    </section>
  );
};

const mapDispatchToProps = {
  setFieldValue,
};

export default connect(null, mapDispatchToProps)(Select);
