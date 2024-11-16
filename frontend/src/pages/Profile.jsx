import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isChanging, setIsChanging] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Получение данных пользователя
  async function getUserData() {
    try {
      const res = await fetch("http://localhost:8080/user/get-user-by-name", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Ошибка при получении пользователя");
      }

      const userData = await res.json();
      console.log(userData)
      setName(userData.username);
      setEmail(userData.email);
    } catch (error) {
      console.error("Ошибка:", error.message);
    }
  }

  // Сохранение изменений
  async function updateUserData() {
    try {
      const res = await fetch("http://localhost:8080/user/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username: name, email}),
      });

      if (!res.ok) {
        throw new Error("Ошибка при обновлении пользователя");
      }

      setIsChanging(false);
    } catch (error) {
      console.error("Ошибка:", error.message);
      alert("Не удалось сохранить изменения.");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/sign-in");
      return;
    }
    getUserData();
  }, []);



  return (
    <div className="profile">
      {/* Аватар и кнопка */}
      <div className="profile-avatar-section">
        <img className="profile-avatar" src="/default-avatar.png" alt="avatar" />
        <button className="edit-avatar-button">Change Avatar</button>
      </div>

      {/* Информация о пользователе */}
      <div className="profile-info">
        <div className="profile-field">
          <span>Name:</span>
          {isChanging ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div className="profile-field">
          <span>Email:</span>
          {isChanging ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{email}</span>
          )}
        </div>
        {/* <div className="profile-field">
          <span>Password:</span>
          <span>********</span>
        </div> */}
      </div>

      {/* Кнопки управления */}
      <div className="profile-actions">
        {isChanging ? (
          <button className="save-button" onClick={updateUserData}>
            Save Changes
          </button>
        ) : (
          <button className="change-button" onClick={() => setIsChanging(true)}>
            Change
          </button>
        )}

        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/sign-in");// Перенаправление на страницу входа
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
