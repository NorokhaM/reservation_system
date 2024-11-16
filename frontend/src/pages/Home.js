import React, { useEffect, useState } from 'react';
import FieldList from '../components/FieldList';
import { Link } from 'react-router-dom';
// import Calendar from '../components/Calendar';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [fieldsList, setFieldsList] = useState([]);

  useEffect(() => {
    // Запускаем анимацию после монтирования компонента
    setIsVisible(true);
    console.log(localStorage.getItem("token"));
    setItem(localStorage.getItem("token"))
  }, []);

  async function getFields() {
    const fields = await fetch(`http://localhost:8080/playground/get/all`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!fields.ok) {
      throw new Error('Ошибка при получении списка полей');
    }

    const fieldList = await fields.json();
    setFieldsList(fieldList);
  }

  useEffect(() => {
    getFields();
  }, [])

  return (
    <div className="home-container">
      <h1 className={`home-title ${isVisible ? 'animate' : ''}`}>
        Rezervacny system Petrzalka
      </h1>
      <FieldList fields={fieldsList}/>
      {
        item === null ?
        <button><Link to={"/sign-in"}>Sign In</Link></button>
        : null
      }
      {
        item === null ?
        <button><Link to={"/sign-up"}>Sign Up</Link></button>
        : null
      }
      {/* <Calendar /> */}
    </div>
  );
};

export default HomePage;
