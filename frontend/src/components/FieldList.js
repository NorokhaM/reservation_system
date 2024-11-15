import React from 'react';
import styles from '../styles/elements/components_style/_FieldList.module.scss';

const FieldList = ({ fields, onSelect }) => (
  <div className={styles.fieldListContainer}>
    {fields.map((field, index) => (
      <div key={index} className={styles.fieldItem} onClick={() => onSelect(field)}>
        <h3>{field.name}</h3>
        <p>{field.location}</p>
      </div>
    ))}
  </div>
);

export default FieldList;