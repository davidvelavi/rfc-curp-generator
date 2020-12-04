import React from 'react';
import '../assets/styles/components/DisplayItem.scss';

const DisplayItem = ({ title, value }) => {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    element.select();
    document.execCommand('copy');
  };
  return (
    <section className='display-item'>
      <section className='display-item-data'>
        <p className='display-item-title'>{title}</p>
        <input
          className='display-item-value'
          value={value}
          readOnly
          id={title}
        />
      </section>
      <button
        type='button'
        className='display-item-button'
        onClick={() => handleClick(title)}
      >
        {' '}
        copiar

      </button>
    </section>
  );
};

export default DisplayItem;
