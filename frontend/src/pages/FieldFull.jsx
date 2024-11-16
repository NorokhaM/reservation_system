import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "../components/Calendar";
import TimePicker from "../components/TimePicker";

const FieldFull = () => {
  const { fieldName } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState({ start: "", end: "" });
  const [userId, setUserId] = useState(null);
  const [isRegular, setIsRegular] = useState(false); // State for checkbox
  const [selectedDate, setSelectedDate] = useState(null); // Selected date from Calendar

  // Fetch user ID
  const getUserId = async () => {
    try {
      const res = await fetch("http://localhost:8080/user/get-user-by-name", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Chyba pri získavaní používateľa");
      }

      const userData = await res.json();
      setUserId(userData.id);  // Set userId from the response
    } catch (error) {
      console.error("Chyba:", error.message);
    }
  };

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/sign-in");
          return;
        }

        const headers = { "method": "GET", "Authorization": `Bearer ${token}` };

        const { data: fieldId } = await axios.get(
          `http://localhost:8080/playground/get-id/${fieldName}`,
          { headers }
        );

        const { data: fieldReservations } = await axios.get(
          `http://localhost:8080/reservation/get/playground/${fieldId}`,
          { headers }
        );

        setReservations(fieldReservations);

        const { data: fieldData } = await axios.get(
          `http://localhost:8080/playground/get/${fieldId}`,
          { headers }
        );

        setField(fieldData);
      } catch (error) {
        console.error("Chyba pri načítaní dát:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFieldData();
    getUserId(); // Fetch user ID when the component loads
  }, [fieldName, navigate]);

  const generateTimeOptions = () => {
    const options = [];
    let currentTime = new Date(Date.UTC(1970, 0, 1, 0, 0, 0)); // Start at 00:00 UTC
    const endTime = new Date(Date.UTC(1970, 0, 1, 23, 30, 0)); // End at 23:30 UTC

    while (currentTime <= endTime) {
      const hours = String(currentTime.getUTCHours()).padStart(2, "0");
      const minutes = String(currentTime.getUTCMinutes()).padStart(2, "0");
      options.push(`${hours}:${minutes}`);
      currentTime.setUTCMinutes(currentTime.getUTCMinutes() + 30);
    }

    return options;
  };

  const handleTimeChange = (type, value) => {
    setSelectedTime((prev) => {
      const newTime = { ...prev, [type]: value };

      // If the start time changes, reset end time if it's less than the start time
      if (type === "start" && newTime.end && value >= newTime.end) {
        newTime.end = "";
      }

      return newTime;
    });
  };

  const handleReservation = async () => {
    // Убедимся, что данные есть перед продолжением
    if (!userId) {
      alert("Používateľ nie je prihlásený.");
      return; // Проверка, если userId отсутствует
    }
  
    if (!field) {
      alert("Informácie o poli sú neplatné.");
      return; // Проверка, если field отсутствует
    }
  
    if (!selectedDate) {
      alert("Dátum nie je vybraný.");
      return; // Проверка, если selectedDate отсутствует
    }
  
    if (selectedTime.start === "") {
      alert("Začiatok rezervácie nie je zadaný.");
      return; // Проверка, если start time отсутствует
    }
  
    if (selectedTime.end === "") {
      alert("Koniec rezervácie nie je zadaný.");
      return; // Проверка, если end time отсутствует
    }
  
    const formatDate = (date, time) => {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      const hh = time.split(":")[0];
      const min = time.split(":")[1];
      return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
    };
  
    const reservationStartDate = formatDate(selectedDate, selectedTime.start);
    const reservationEndDate = formatDate(selectedDate, selectedTime.end);
  
    const reservationData = {
      reservationStartDate,
      reservationEndDate,
      status: isRegular ? "REGULAR" : "ONCE",  // Set status based on checkbox
    };

    console.log(reservationData)
  
    try {
      const response = await axios.post(
        `http://localhost:8080/reservation/add/${userId}/${field.id}`,
        reservationData, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        alert("Rezervácia úspešne vytvorená");
      } else {
        alert("Chyba pri vytváraní rezervácie");
      }
    } catch (error) {
      console.error("Chyba pri vytváraní rezervácie:", error);
      alert("Chyba pri vytváraní rezervácie");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!field) return <p>Chyba pri načítaní dát</p>;

  const timeOptions = generateTimeOptions();

  const disabledTimes = reservations.map((reservation) => {
    const start = new Date(reservation.reservationStartDate).toISOString().slice(11, 16);
    const end = new Date(reservation.reservationEndDate).toISOString().slice(11, 16);
    return [start, end];
  }).flat();

  const availableEndTimes = timeOptions.filter(time => {
    return selectedTime.start ? time > selectedTime.start : true;
  });

  return (
    <div className="fieldfull">
      <h1 className="fieldfull-name">{field.name}</h1>
      <p className="fieldfull-location">{field.location}</p>
      <h3 className="fieldfull-price">Cena: {field.price} €</h3>
      <p className="fieldfull-description">{field.description}</p>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <h2 className="fieldfull-reservation-title">Zarezervované</h2>
      <div className="fieldfull-reservations-container">
        {reservations.length > 0 ? (
          <ul className="reservations-list">
            {reservations.map((reservation) => (
              <li key={reservation.id} className="reservation-item">
                <p>
                  <strong>Status:</strong> {reservation.status}
                </p>
                <p>
                  <strong>Začiatok:</strong> {reservation.reservationStartDate}
                </p>
                <p>
                  <strong>Koniec:</strong> {reservation.reservationEndDate}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Žiadne aktuálne rezervácie.</p>
        )}
      </div>
      <div className="time-selection">
        <h2>Vyberte čas na rezerváciu</h2>
        <TimePicker
          options={timeOptions}
          selected={selectedTime.start}
          onSelect={(value) => handleTimeChange("start", value)}
          disabledOptions={disabledTimes}
        />
        <TimePicker
          options={availableEndTimes}
          selected={selectedTime.end}
          onSelect={(value) => handleTimeChange("end", value)}
          disabledOptions={disabledTimes}
        />
        {selectedTime.start && selectedTime.end && disabledTimes.includes(selectedTime.start) ? (
          <p style={{ color: "red" }}>Vybraný čas je už zarezervovaný.</p>
        ) : (
          selectedTime.start &&
          selectedTime.end && (
            <p style={{ color: "green" }}>Vybraný čas je dostupný.</p>
          )
        )}
        <div className="fieldfull-checkbox">
          <label>
            <input 
              type="checkbox" 
              checked={isRegular} 
              onChange={() => setIsRegular(!isRegular)} 
            />
            Zarezervovať na mesiac vopred
          </label>
        </div>
        <button onClick={handleReservation}>Zarezervovať</button>
      </div>
    </div>
  );
};

export default FieldFull;
