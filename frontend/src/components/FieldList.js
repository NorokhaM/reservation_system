import React from 'react';
import FieldCard from './FieldCard';

const FieldList = ({ fields }) => {

  return (
    <div className='fieldlist'>
      <h2 className='fieldlist-title'>Our Fields</h2>
      {fields.map(field => {
        return <FieldCard key={field.name} {...field} ></FieldCard>
      })}
    </div>
  )
}

export default FieldList;