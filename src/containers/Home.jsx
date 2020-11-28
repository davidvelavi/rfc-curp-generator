import React from 'react';
import Input from '../components/Input';
import Form from '../components/Form';
import '../assets/styles/App.scss';

const Home = () => (
  <Form>
    <Input id='name' label='Nombre' />
    <Input id='lastName' label='Apellido Paterno' />
    <Input id='secondLastName' label='Apellido Paterno' />
    <Input id='birthDate' label='Fecha de nacimiento ' />
  </Form>
);

export default Home;

