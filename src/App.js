import "./App.scss";
import "./day.scss";
import "./night.scss";

import React, { useState } from "react";

import { BsSearch } from "react-icons/bs";
import axios from "axios";

import img from "./icons/night/113.png";
import { appendErrors } from "react-hook-form";
const App = () => {
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const API_KEY = "a027ddca1e8d41a1891153250223012";
  const BASE_URL = "http://api.weatherapi.com/v1/current.json?key=";

  const searchLocation = (CityName) => {
    const request_url = BASE_URL + API_KEY + "&q=" + CityName;

    // const API_KEY = "70662770441afda3d7a7a5a94a82f95e";
    // const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
    // const request_url = BASE_URL + CityName + "&appid=" + API_KEY;

    if (!CityName) return;
    axios
      .get(request_url)
      .then((res) => {
        // console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  console.log(data);
  const handleChangeInput = (e) => {
    // console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchLocation(inputCity);
  };

  const buttonCALIFORNIA = (e) => {
    e.preventDefault();
    searchLocation("california");
  };

  const buttonPARIS = (e) => {
    e.preventDefault();
    searchLocation("paris");
  };

  const buttonTOKYO = (e) => {
    e.preventDefault();
    searchLocation("tokyo");
  };

  const buttonNEWORK = (e) => {
    e.preventDefault();
    searchLocation("new york");
  };

  const current_Temp = data?.current?.temp_c;
  const date = data?.location?.localtime;
  console.log(date);
  const y = parseInt(date?.substr(0, 4));
  const m = parseInt(date?.substr(5, 2));
  const d = parseInt(date?.substr(8, 2));
  const time = date?.substr(11);

  // const dateOutPut = `${dayofTheWeek(d, m, y)} ${d}, ${m} ${y}`;
  // console.log(dateOutPut);
  const weekend = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const TimeOutput = ` - ${weekend} ${d}, ${m} ${y}`;
  // console.log(TimeOutput);

  // const iconId = data?.current?.condition?.icon.substr(
  //   "//cdn.weatherapi.com/weather/64x64".length
  // );
  // const iconsrc = "./icons" + iconId;
  // console.log(iconsrc);

  const iconimg = data?.current?.condition?.icon;
  // console.log(iconimg);

  const Style = "Weather_App";

  let TIME_OF_DAY = "";
  if (!data?.current?.is_day) {
    TIME_OF_DAY = "night";
  } else {
    TIME_OF_DAY = "day";
  }
  let Weather_Type = "Clear";
  console.log(TIME_OF_DAY);
  let code = data?.current?.condition?.code;

  if (code === 1000) {
    Weather_Type = "Clear";
  } else if (code == 1003) {
    Weather_Type = "Partialy_Cloudy";
  } else if (code == 1006) {
    Weather_Type = "Cloudy";
  } else if (code == 1009) {
    Weather_Type = "OverCast";
  } else if (code == 1030) {
    Weather_Type = "Mist";
  } else if (
    code == 1063 ||
    code == 1069 ||
    code == 1180 ||
    code == 1183 ||
    code == 1186 ||
    code == 1189 ||
    code == 1198 ||
    code == 1240 ||
    code == 1273 ||
    code == 1249
  ) {
    Weather_Type = "Rain";
  } else if (
    code == 1066 ||
    code == 1072 ||
    code == 1114 ||
    code == 1210 ||
    code == 1213 ||
    code == 1216 ||
    code == 1219 ||
    code == 1255 ||
    code == 1261
  ) {
    Weather_Type = "Snow";
  } else if (
    code == 1087 ||
    code == 1150 ||
    code == 1153 ||
    code == 1276 ||
    code == 1279 ||
    code == 1282
  ) {
    Weather_Type = "Thunder_Strom";
  } else if (
    code == 1117 ||
    code == 1168 ||
    code == 1171 ||
    code == 1222 ||
    code == 1225 ||
    code == 1237 ||
    code == 1258 ||
    code == 1264
  ) {
    Weather_Type = "Blizzard";
  } else if (code == 1135 || code == 1147) {
    Weather_Type = "Fog";
  } else if (code == 1276 || code == 1279 || code == 1282) {
    Weather_Type = "Cloudy";
  } else if (
    code == 1192 ||
    code == 1195 ||
    code == 1201 ||
    code == 1204 ||
    code == 1207 ||
    code == 1243 ||
    code == 1246 ||
    code == 1252
  ) {
    Weather_Type = "Heavy_Rain";
  }

  return (
    <div className={TIME_OF_DAY}>
      <div className={`${Style}  ${Weather_Type}`}>
        <div className="Container">
          <h3 className="brand">The Weather</h3>
          <div>
            <h1 className="Temp">{current_Temp}&deg;</h1>
            <div className="City_Time">
              <h1 className="Name">{data?.location?.name}</h1>
              <small>
                <span className="Time">{time} </span>
                <span className="Date">{TimeOutput}</span>
              </small>
            </div>
            <div className="Weather">
              <img
                src={iconimg ? iconimg : img}
                className="Icon"
                alt=""
                width="50"
                height="50"
              />
              <span className="Condition">
                {data?.current?.condition?.text}
              </span>
            </div>
          </div>
        </div>
        <div className="Panel">
          <form id="LocationInput">
            <input
              type="text"
              className="Search"
              placeholder="Search Location..."
              value={inputCity}
              onChange={handleChangeInput}
            />
            <button type="submit" className="submit" onClick={handleSearch}>
              <BsSearch className="Search_Icon" />
            </button>
          </form>
          <ul className="Cities">
            <li className="City" onClick={buttonNEWORK}>
              New York
            </li>
            <li className="City" onClick={buttonCALIFORNIA}>
              California
            </li>
            <li className="City" onClick={buttonPARIS}>
              Paris
            </li>
            <li className="City" onClick={buttonTOKYO}>
              Tokyo
            </li>
          </ul>

          <ul className="Details">
            <h4>Weather Details</h4>
            <li>
              <span>Cloudy</span>
              <span className="Cloud">{data?.current?.cloud} %</span>
            </li>

            <li>
              <span>Humidity</span>
              <span className="Humidity">{data?.current?.humidity} %</span>
            </li>

            <li>
              <span>Wind</span>
              <span className="Wind">{data?.current?.wind_kph} km/h</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
