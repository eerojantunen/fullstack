import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [allCountries, setAllCountries] = useState(null)
  const [currentFilter, setCurrentFilter] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  useEffect(() => {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setAllCountries(response.data.map(country => country))
        })
  }, [])

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
    setSelectedCountry(null)
  }

  useEffect(() => {
    if (selectedCountry) {
      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
        console.log("response got")
      })
    }
  },[selectedCountry])

  useEffect(() => {
    if (filteredCountries !== null) {
      if (filteredCountries.length === 1) {
        setSelectedCountry(filteredCountries[0])
    }}
  },[currentFilter])



  const filteredCountries = (currentFilter === null)
    ? []
    : allCountries.filter(country => country.name.common.toLowerCase().includes(currentFilter.toLowerCase()))

  const countriesToShow = (filteredCountries.length < 10)
    ? filteredCountries
    : null

  return (
    <div>
      find countries 
      <input onChange={handleFilterChange}/>
        <Country countriesToShow={countriesToShow} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} weatherData={weatherData}/>
    </div>
  )
}

const Country = ({countriesToShow, selectedCountry, setSelectedCountry, weatherData}) => {
  if (countriesToShow === null){
    return(
      null
    )
  }
  if (selectedCountry !== null) {
    return (
      <SingleCountry singleCountry={selectedCountry} weatherData={weatherData}/>
    )
  }

  return(
    countriesToShow.map(country => {
      return(
      <div key={country.name.common}>
        <p>{country.name.common}<button onClick={() => setSelectedCountry(country)}>Show</button></p>
        
      </div>
    )})
  )
}

const SingleCountry = ({singleCountry, weatherData}) => {
  return(
      <div key={singleCountry.name.common}>
        <h2>{singleCountry.name.common}</h2>
        <p>capital {singleCountry.capital}</p>
        <p>area {singleCountry.area}</p>
        <h3>Languages</h3>
        <ul>
        {Object.values(singleCountry.languages).map(language =>{
          return(
            <li>{language}</li>)
        })}
        </ul>
        <img src={singleCountry.flags.png}/>
        <h2>Weather in {singleCountry.capital}</h2>
        {weatherData !== null
        ? (<div>
          <p>Temperature: {weatherData.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
          <p>Wind {weatherData.wind.speed} m/s</p>
          </div>)
        : (<p>loading weather data</p>)}
      </div>
    )}

export default App