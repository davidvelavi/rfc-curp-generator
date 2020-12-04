import React from 'react';
import { connect } from 'react-redux';
import { setFieldValue } from '../actions';
import '../assets/styles/components/RadioButton.scss';

const RadioButton = (props) => {
  const { id, label, options, dataUser, setFieldValue } = props;
  const handleRadio = ({ target }) => {
    setFieldValue({
      ...dataUser,
      [target.name]: target.value,
    });
  };
  return (
    <section className='radio-button'>
      {
        options.map((item, index) => (
          <label htmlFor={item.gender} key={index} className='radio-button-label'>
            {item.gender}
            <input
              type='radio'
              id={item.gender}
              name={id}
              value={item.gender}
              onChange={handleRadio}
              className='radio-button-input'
            />
            <span className='radio-button-circle' />
          </label>
        ))
      }
    </section>
  );
};

const mapDispatchToProps = {
  setFieldValue,
};

export default connect(null, mapDispatchToProps)(RadioButton);

