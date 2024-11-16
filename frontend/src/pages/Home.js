import React, { useEffect, useState } from 'react';
import FieldList from '../components/FieldList';
import { Link } from 'react-router-dom';
// import Calendar from '../components/Calendar';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Запускаем анимацию после монтирования компонента
    setIsVisible(true);
    console.log(localStorage.getItem("token"));
    setItem(localStorage.getItem("token"))
  }, []);



  const fields = [{name: "KOKOT", price: 100, location: "Buzik Street"}, 
    {name: "Picus Footbal", price: 150, location: "Pica Aveniu"}]
  

  return (
    <div className="home-container">
      <h1 className={`home-title ${isVisible ? 'animate' : ''}`}>
        Rezervacny system Petrzalka
      </h1>
      <FieldList fields={fields}/>
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
