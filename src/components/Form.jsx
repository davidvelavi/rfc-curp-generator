import React from 'react';
import { connect } from 'react-redux';
import '../assets/styles/components/Form.scss';
import { setRfcCurp } from '../actions';
import GenerateCurp from '../utilities/GenerateCurp';

const Form = ({ children, form, setRfcCurp }) => {

  const handleForm = (event) => {
    event.preventDefault();
    const generateCurp = new GenerateCurp(form);
    setRfcCurp({
      curp: generateCurp.curp,
      rfc: generateCurp.rfc,
    });
  };
  const disabled = !Object.values(form).every((item) => !!item);
  return (
    <form className='form'>
      { children }
      <div className='form-button-wrapper'>
        <button
          className='form-button'
          type='submit'
          onClick={handleForm}
          disabled={disabled}
        >
          {' '}
          Obtener
          {' '}

        </button>
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  setRfcCurp,
};
const mapStateToProps = ({ dataUser }) => {
  return {
    form: { ...dataUser },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
