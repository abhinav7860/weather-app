import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import cloud_icon from '../assets/cloud.png';

import bg_clear from '../assets/bg_clear.jpg';
import bg_rain from '../assets/bg_rain.jpg';
import bg_snow from '../assets/bg_snow.jpg';
import bg_cloud from '../assets/bg_cloud.jpg';
import bg_drizzle from '../assets/bg_drizzle.jpg';
import bg_default from '../assets/bg_default.jpg';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState(bg_default);
  const [localTime, setLocalTime] = useState('');

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const getBackground = (iconCode) => {
    if (["01d", "01n"].includes(iconCode)) return bg_clear;
    if (["02d", "02n", "03d", "03n"].includes(iconCode)) return bg_cloud;
    if (["04d", "04n"].includes(iconCode)) return bg_drizzle;
    if (["09d", "09n", "10d", "10n"].includes(iconCode)) return bg_rain;
    if (["13d", "13n"].includes(iconCode)) return bg_snow;
    return bg_default;
  };

  // ⏱️ Live clock based on timezone offset
  useEffect(() => {
    let interval;
    if (weatherData?.timezone) {
      interval = setInterval(() => {
        const nowUTC = Date.now();
        const local = new Date(nowUTC + weatherData.timezone * 1000);
        const formatted = local.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'UTC'
        });
        setLocalTime(formatted);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [weatherData]);

  const search = async (city) => {
    if (city === '') {
      alert("Enter city name!");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const iconCode = data.weather[0].icon;
      const icon = allIcons[iconCode] || clear_icon;
      const backgroundImg = getBackground(iconCode);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        timezone: data.timezone,
        condition: data.weather[0].main.toLowerCase(), // 👈 added for condition text
      });

      setBackground(backgroundImg);
    } catch (error) {
      setWeatherData(null);
      console.error("Error in fetching weather data", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div
      className="weather"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className="weather-icon" />

          {/* 👇 Weather condition text under icon */}
          <p className="condition-text">
            {
              ["clear", "clouds", "drizzle", "rain", "snow"].includes(weatherData.condition)
                ? weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)
                : ""
            }
          </p>

          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <p className="local-time">Local Time: {localTime}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Windspeed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
