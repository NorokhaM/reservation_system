import React from 'react';
import FieldCard from './FieldCard';

const FieldList = ({ fields, onSelect }) => {

  return (
    <div className='fieldlist'>
      <h2 className='fieldlist-title'>Our Fields</h2>
      {fields.map(field => {
        return <FieldCard  {...field} ></FieldCard>
      })}
    </div>
  )
}

export default FieldList;