import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Select from '../components/Select';
import Form from '../components/Form';
import RadioButton from '../components/RadioButton';
import DatePicker from '../components/DatePicker';
import DisplayItem from '../components/DisplayItem';
import '../assets/styles/App.scss';
import Estados from '../utilities/Estados';

const Home = ({ rfc, curp }) => {
  return (
    <Form>
      <Input id='name' label='Nombre' />
      <Input id='lastName' label='Apellido Paterno' />
      <Input id='secondLastName' label='Apellido Materno' />
      <DatePicker id='birthDate' label='Fecha de nacimiento ' />
      <RadioButton id='gender' label='Genero' options={[{ 'gender': 'M' }, { 'gender': 'F' }]} />
      <Select id='state' label='Estado' options={Estados} />
      {
        curp && <DisplayItem title='CURP :' value={curp} />
      }
      {
        rfc && <DisplayItem title='RFC :' value={rfc} />
      }
    </Form>
  );
};

const mapStateToProps = ({ rfc, curp }) => {
  return {
    rfc, curp,
  };
};
export default connect(mapStateToProps, null)(Home);

