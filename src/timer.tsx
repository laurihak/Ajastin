import React, { useState } from "react";

import "./timer.css";

const hoursOptions = Array.from(Array(24).keys());
const minutesOptions = Array.from([0, 15, 30, 45]);

const Timer = () => {
  const [wantedStart, setWantedStart] = useState({ hours: "7", minutes: "0" });
  const [heaterStart, setHeaterStart] = useState<string>();
  const [nextDay, setNextDay] = useState(true);
  const dateNow = new Date();
  const hoursNow: number = dateNow.getHours();
  const minutesNow: number = dateNow.getMinutes();

  const handleMinuteChange = (value: string) => {
    setWantedStart({ ...wantedStart, minutes: value });
  };
  const handleHourChange = (value: string) => {
    setWantedStart({ ...wantedStart, hours: value });
  };
  const handleDayChange = () => {
    setNextDay(!nextDay);
  };

  const calculateTime = () => {
    if (!wantedStart) {
      window.alert("Virhe kokeile uudelleen");
      return;
    }
    const splittedTime: string[] = wantedStart.toString().split(":");
    const wantedHours: number = parseInt(wantedStart.hours);
    const wantedMinutes: number = parseInt(wantedStart.minutes);

    const dateWanted: Date = new Date();

    if (nextDay) dateWanted.setDate(dateNow.getDate() + 1);
    else dateWanted.setDate(dateNow.getDate());

    dateWanted.setHours(wantedHours);
    dateWanted.setMinutes(wantedMinutes);

    const differenceInHours = (dateWanted.getTime() - dateNow.getTime()) / 36e5;
    if (differenceInHours < 0) return window.alert("Ei onnistu, aikaa liian vähän");
    const whatTimeToSetForHeater = hoursToTime((differenceInHours + 2) * 60);

    setHeaterStart(whatTimeToSetForHeater);
  };

  const hoursToTime = (num: number) => {
    let hours = Math.floor(num / 60);
    const minutes = Math.floor(num % 60);
    return `${hours.toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    })}:${minutes.toLocaleString("en-us", { minimumIntegerDigits: 2 })}`;
  };
  return (
    <div>
      <div className="Item">
        Kello nyt: {dateNow.getHours().toLocaleString("en-us", { minimumIntegerDigits: 2 })}:
        {dateNow.getMinutes().toLocaleString("en-us", { minimumIntegerDigits: 2 })}
      </div>
      <div style={{ width: "100%", paddingBottom: "10px" }}>Milloin haluat lämmityksen alkavan?</div>
      <div style={{ width: "100%", paddingBottom: "10px" }}>
        <select className="Select" onChange={(e) => handleHourChange(e.target.value)} defaultValue={7}>
          {hoursOptions.map((hour: number) => (
            <option key={hour} value={hour}>
              {hour.toLocaleString("en-us", { minimumIntegerDigits: 2 })}
            </option>
          ))}
        </select>
        :
        <select className="Select" onChange={(e) => handleMinuteChange(e.target.value)}>
          {minutesOptions.map((minute: number) => (
            <option key={minute} value={minute}>
              {minute.toLocaleString("en-us", { minimumIntegerDigits: 2 })}
            </option>
          ))}
        </select>
      </div>
      <button className={"Button"} onClick={calculateTime}>
        Laske mihin ajastin tulee asettaa
      </button>
      <div className={"Item"}>
        <label className="switch">
          Onko haluttu aika seuraavalle päivälle?
          <input type="checkbox" checked={nextDay} onClick={handleDayChange} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="Item">
        Ajastin täytyy asettaa:{" "}
        <p>
          <b className="text-heater-start">{heaterStart}</b>
        </p>
      </div>
    </div>
  );
};

export default Timer;
