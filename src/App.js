import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(query);

            setWeather(data);
            setQuery('');
        }
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 27) ? 'main-container warm' : 'main-container cool') : 'main-container'}>
            <input type="text"className="search" placeholder="🔍︎ Search City"value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 27) ? 'city' : 'city cool') : 'city cool'}>
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 27) ? 'city-temp' : 'city-temp cool') : 'city-temp cool'}>
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;