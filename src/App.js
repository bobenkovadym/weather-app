import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

export default class App extends React.Component {

  state = {
    error: undefined
  };

  gettingWeather = (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a93c0829afea521947daa54ae2971314&units=metric`;

    if (city) {
      fetch(url)
      .then(res => res.json())
      .then(data => {
           this.setState({
            city: data.name,
            temp: data.main.temp,
            country: data.sys.country,
            pressure: data.main.pressure,
            error: undefined
          })
        })
      .catch(e => {
        if (e.message === "Cannot read property 'temp' of undefined") {
          this.setState({
           city: undefined,
           temp: undefined,
           country: undefined,
           pressure: undefined,
           error: 'Некорректное название города'
         })
       } else {
         this.setState({
          city: undefined,
          temp: undefined,
          country: undefined,
          pressure: undefined,
          error: 'Что-то пошло не так, похоже сервер не отвечает'
         })
       }
      })
    } else {
       this.setState({
        error: 'Введите название города'
      })
    }
  }

  render () {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  city={this.state.city}
                  country={this.state.country}
                  temp={this.state.temp}
                  pressure={this.state.pressure}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
