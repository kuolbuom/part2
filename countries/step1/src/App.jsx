import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);

  // Fetch all countries once on mount
  useEffect(() => {
    console.log('effect run')
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('data arrived',response.data)
        setCountries(response.data)
      })
        .catch(error => {
          console.log('error happened',error)
        });
  }, []);

  const handleSearchCountries = (event) => {
    setValue(event.target.value);
  }

  // Filter countries based on search input
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

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
        </div>
      )}

        {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
          // 2–10 countries → show only names
          <div>
            {filteredCountries.map(country => (
              <div key={country.name.common}>{country.name.common}</div>
            ))}
          </div>
        )}

        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter.</p>
        )}
    </div>
  );
}

export default App;