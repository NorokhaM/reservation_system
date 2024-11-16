import React from 'react';
import { useParams } from 'react-router-dom';
import Calendar from "../components/Calendar"

const FieldFull = () => {
  // Извлекаем имя поля из URL
  const { fieldName } = useParams();

  // Можете добавить логику для получения данных о поле по имени (например, запрос к серверу)
  const fieldId = fetch(`http://localhost:8080/playground/get/${fieldName}`, {method: 'GET',})
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
      console.log(data);  // Handle the response data
      return data;  // Return the data if needed
    })
    .catch(error => {
      console.error('Error fetching field data:', error);  // Handle any errors
    });

    const field = fetch(`http://localhost:8080/playground/get/${fieldId}`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching field data:', error);
    })

  return (
    <div className="fieldfull">
      <h1 className="fieldfull-name">{field.name}</h1>
      <p className="fieldfull-location">{field.location}</p>
      <h3 className="fieldfull-price">Price: {field.price} €</h3>
      <p className="fieldfull-descriprion">{field.description}</p>
      <Calendar />
    </div>
  );
};

export default FieldFull;