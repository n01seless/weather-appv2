import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Lottie from 'react-lottie'
import animationData from './assets/home.json'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`


  const defaultOptions = {
    loop: true, autoplay: true, animationData: animationData, renderSettings:{
      preserveAspectRatto: "xMidYMid slice"
    }
  };
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const handleClick= () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }

 

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
          <button className='search-btn' onClick={handleClick}>Search</button>
          <div className='HomeAnimation'>
            {data.main ? null : <Lottie options={defaultOptions} height={400} width={400} /> } 
          </div>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div></div>

          
       
        

          

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} km/h</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
          
        }


</div>
      </div>
  );
}

export default App;
