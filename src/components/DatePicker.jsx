import React from 'react';
import { connect } from 'react-redux';
import { setFieldValue } from '../actions';
import '../assets/styles/components/DatePicker.scss';

const DatePicker = (props) => {
  const { id, label, setFieldValue, dataUser } = props;
  const handleDatePicker = ({ target }) => {
    const [year, month, day] = target.value.split('-');
    setFieldValue({
      ...dataUser,
      [target.id]: `${day}/${month}/${year}`,
    });
  };
  return (
    <section className='date-picker'>
      <label htmlFor={id}>
        {' '}
        {label}
      </label>
      <input type='date' id={id} onChange={handleDatePicker} />
    </section>
  );
};
const mapDispathToProps = {
  setFieldValue,
};

export default connect(null, mapDispathToProps)(DatePicker);
