import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);


   // Filter countries based on search input
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  // Fetch all countries once on mount
  useEffect(() => {
    console.log('effect run')
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('data arrived', response.data)
        setCountries(response.data)
      })
      .catch(error => {
        console.log('error happened', error)
      });
  }, []);

  //useEffect for fetching open weather map
  useEffect(() => {
    if (!selectedCountry && filteredCountries.length !== 1) return;

    const country = selectedCountry || filteredCountries[0];
    const capital = country.capital[0];

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => setWeather(response.data))
      .catch(error => console.log(error));

  }, [selectedCountry, filteredCountries])

  const handleSearchCountries = (event) => {
    setValue(event.target.value);
    setSelectedCountry(null); // reset when typing
  }


  return (
    <div>
      <h1>information related to different countries in a so-called machine-readable format via the REST API.</h1>
      <input
        value={value}
        onChange={handleSearchCountries}
        placeholder="Search countries..."
      />

      {filteredCountries.length === 1 && (
        // Exactly one country → show full details
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>
            Capital {filteredCountries[0].capital}
          </div>
          <div>
            Area {filteredCountries[0].area}
          </div>
          <h1>Languages</h1>
          <ul>
            {/* Languages as separate li items */}
            {filteredCountries[0].languages &&
              Object.values(filteredCountries[0].languages).map((lang, index) => (
                <li key={index}> {lang}</li>
              ))}
          </ul>

          <img src={filteredCountries[0].flags.png} alt={`${filteredCountries[0].name.common} flag`} width="150" />
           {/* weather code */}
          {weather && (
            <div>
              <h2>Weather in {weather.name}</h2>

              <div>Temperature: {weather.main.temp} °C</div>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="weather icon"
              />

              <div>Wind: {weather.wind.speed} m/s</div>
            </div>
          )}
        </div>
      )}

      {/* code for selected countries */}
          {selectedCountry && (
            <div>
              <h1>{selectedCountry.name.common}</h1>

              <div>
                Capital {selectedCountry.capital}
              </div>

              <div>
                Area {selectedCountry.area}
              </div>

              <h1>Languages</h1>
              <ul>
                {selectedCountry.languages &&
                  Object.values(selectedCountry.languages).map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))}
              </ul>

              <img
                src={selectedCountry.flags.png}
                alt={`${selectedCountry.name.common} flag`}
                width="150"
              />
            </div>
          )}
          {/* code for weather apps */}
          {weather && (
            <div>
              <h2>Weather in {weather.name}</h2>

              <div>Temperature: {weather.main.temp} °C</div>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="weather icon"
              />

              <div>Wind: {weather.wind.speed} m/s</div>
            </div>
          )}

      {!selectedCountry && filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        // 2–10 countries → show only names
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>
                Show
              </button>
            </div>
          ))}
        </div>
      )}
      {/* logic for more than 10 option */}
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter.</p>
      )}
    </div>
  );
}

export default App;