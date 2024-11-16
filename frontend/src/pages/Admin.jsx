import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fieldList, setFieldList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFields();
  }, []);

  function deleteDevice(deviceId) {
    setDeviceList((prevDevices) => prevDevices.filter((device) => device.id !== deviceId));
  }

  async function getFields() {
    try {
      const fields = await fetch(`http://localhost:8080/playground/get/all`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!fields.ok) {
        throw new Error("Chyba pri získavaní zoznamu polí");
      }

      const fieldList = await fields.json();
      setFieldList(fieldList);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    setDeviceList([
      { id: 1, name: "Zariadenie 1", fieldId: 1 },
      { id: 2, name: "Zariadenie 2", fieldId: 1 },
      { id: 3, name: "Zariadenie 3", fieldId: 2 },
    ]);
  }, []);

  async function deleteField(fieldId) {
    try {
      const response = await fetch(`http://localhost:8080/playground/delete/${fieldId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Chyba pri mazání poľa");
      }

      setFieldList((prevFields) => prevFields.filter((field) => field.id !== fieldId));
      setDeviceList((prevDevices) => prevDevices.filter((device) => device.fieldId !== fieldId));
    } catch (error) {
      console.error(error.message);
    }
  }

  const checkUserRole = async () => {
    try {
      const res = await axios.get('http://localhost:8080/user/get-user-by-name', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { role } = res.data;
      localStorage.setItem('role', role);
      if (role === 'ADMIN') {
        setIsAuthenticated(true);
      } else {
        setError('Nemáte administrátorské práva.');
      }
    } catch (error) {
      setError('Nastala chyba pri kontrole role.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
  
    const data = {
      email: email,
      password: password,
      role: "ADMIN"
    };
  
    try {
      const res = await axios.post('http://localhost:8080/login', data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      localStorage.setItem('token', res.data);
      await checkUserRole();
    } catch (error) {  
      if (error.response?.status === 403) {
        setError('Nesprávne prihlasovacie údaje.');
      } else {
        setError('Chyba pri prihlasovaní. Skúste znova.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="sign-container">
        <h2 className="sign-title">Prihlásenie do administrátorskej sekcie</h2>
        <form onSubmit={handleSignIn} className="sign-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sign-form-input"
            required
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sign-form-input"
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="sign-button">Prihlásiť sa</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-devices">
        <button className="admin-add-device">Pridať zariadenie</button>
        <ul className="admin-devices-list">
          {deviceList.map((device) => (
            <li key={device.id} className="admin-device">
              <h3 className="admin-card-name">{device.name}</h3>
              <p className="admin-card-field">Pole ID: {device.fieldId}</p>
              <button
                className="admin-delete-device"
                onClick={() => deleteDevice(device.id)}
              >
                Odstrániť zariadenie
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-fields">
        <button className="admin-add-field">Pridať pole</button>
        <ul className="admin-fields-list">
          {fieldList.map((field) => (
            <li key={field.id} className="admin-field">
              <h3 className="admin-card-name">{field.name}</h3>
              <p className="admin-card-address">{field.address}</p>
              <button
                className="admin-delete-field"
                onClick={() => deleteField(field.id)}
              >
                Odstrániť pole
              </button>
              <ul className="admin-field-devices">
                {deviceList
                  .filter((device) => device.fieldId === field.id)
                  .map((device) => (
                    <li key={device.id} className="admin-field-device">
                      {device.name}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
