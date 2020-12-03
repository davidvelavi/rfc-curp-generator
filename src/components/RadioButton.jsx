import React from 'react';
import { connect } from 'react-redux';
import { setFieldValue } from '../actions';

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
          <label htmlFor={id} key={index}>
            {item.gender}
            <input type='radio' name={id} value={item.gender} onChange={handleRadio} />
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

