import hot from './images/hot-weather.jpg'
import cold from './images/cold-winter.jpg'
import Descriptions from './Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './WeatherService';

function App() {

const [ weather, setWeather ] = useState(null);
const [ units, setUnits ] = useState("metric");
const [ city, setCity ] = useState("Cluj-Napoca");
const [ bg, setBg ] = useState(hot);


useEffect(() => {
  const fetchWeatherData = async() => {
  const data = await getFormattedWeatherData(city, units);
  setWeather(data); 

  const coldbg = units === 'metric' ? 20 : 60;
  if(data.temp <= coldbg) setBg(cold);
    else setBg(hot);

 };
  fetchWeatherData();
},[units, city]);

const handleUnitsClick = (e) => {
      const button = e.currentTarget;
      const currentUnit = button.innerText.slice(1);
      console.log(currentUnit);

      const celsius = currentUnit === 'C';
      button.innerText = celsius ? '°F' : '°C';
      setUnits(celsius ? "metric" :"imperial");

}

const enterKeyPressed = (e) => 
{
  if(e.keyCode === 13){
    setCity(e.currentTarget.value);
    e.currentTarget.blur();
  }

}

  return (
    <div className="app"
     style={{backgroundImage: `url(${bg})`}}>
        <div className= "overlay">
          {
            weather && (
              <div className= "container">
              <div className= "section.section_inputs">
                <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter city'/>
                  <button onClick={(e) => handleUnitsClick(e)}>°C</button>
              </div>
      
                <div className="section section_temperature">
                  <div className="icon">
                    <h3>{`${weather.name}, ${weather.country}`}</h3>
                    <img src={weather.iconURL} alt="weatherIcon" />
                    <h2>{weather.description}</h2>
                  </div>
                  <div className="temperature">
                    <h1> {`${weather.temp.toFixed()}
                    °${(units) === 'metric' ? 'C' : 'F'}`} </h1>
                  </div>
                </div>
      
                <Descriptions weather={weather}
                              units={units} />
                </div>

            )
          }    
        </div>
    </div>
  );
}

export default App;

