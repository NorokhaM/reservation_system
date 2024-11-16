import React, { useState, useRef } from "react";

const TimePicker = ({ options, selected, onSelect, disabledOptions = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("down"); // Направление открытия
  const pickerRef = useRef(null);

  const toggleDropdown = () => {
    if (!isOpen) {
      const rect = pickerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setPosition(rect.bottom + 200 > windowHeight ? "up" : "down"); // Определяем направление
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="time-selection-container" ref={pickerRef}>
      <button className="time-picker-button" onClick={toggleDropdown}>
        {selected || "Выберите время"}
      </button>
      {isOpen && (
        <div className={`time-dropdown time-dropdown-${position}`}>
          {options.map((option) => (
            <div
              key={option}
              className={`time-option ${disabledOptions.includes(option) ? "disabled" : ""}`}
              onClick={() => !disabledOptions.includes(option) && handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
