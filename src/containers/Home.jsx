import React from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import Form from '../components/Form';
import RadioButton from '../components/RadioButton';
import DatePicker from '../components/DatePicker';
import '../assets/styles/App.scss';
import Estados from '../utilities/Estados';

const Home = () => (
  <Form>
    <Input id='name' label='Nombre' />
    <Input id='lastName' label='Apellido Paterno' />
    <Input id='secondLastName' label='Apellido Materno' />
    <DatePicker id='birthDate' label='Fecha de nacimiento ' />
    <RadioButton id='gender' label='Genero' options={[{ 'gender': 'M' }, { 'gender': 'F' }]} />
    <Select id='state' label='Estado' options={Estados} />
  </Form>
);

export default Home;

