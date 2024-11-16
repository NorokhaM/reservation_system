import React from 'react';
import { Link } from 'react-router-dom';

const FieldCard = ({ name, price, address }) => {
  // Генерация URL для поля
  const fieldUrl = `/fields/${name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className='fieldcard'>
      <Link to={fieldUrl}>
        <h3 className='fieldcard-name'>{name}</h3>
        <div className='fieldcard-information'>
          <span className='fieldcard-location'>{address}</span>
          <h4 className='fieldcard-price'>{price}</h4>
        </div>
      </Link>
    </div>
  );
};

export default FieldCard;