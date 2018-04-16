import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";



const PLACES = [
  { name: "Оренбург", zip: "515001" },
  { name: "Орск", zip: "514734" },
  { name: "Актобе", zip: "610611" },
  { name: "Москва", zip: "5601538" },
  { name: "Сорочинск", zip: "490554" },
  { name: "Мелеуз", zip: "527717" }

];

class Huita extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      qq: {}
    };
  }
  componentDidMount()
  {
    fetch('http://127.0.0.1:5000/api/info').then(res=>res.json()).then(json =>
  {
    console.log(json);
    this.setState({qq : json});
  })
  }

  render()
  {

  return (<div><h1>Ebaaa </h1><h2>Server system time: {this.state.qq.systemTime}</h2>
  <h2>OS info: {this.state.qq.OSInfo}</h2>
  <h2>Uptime: {this.state.qq.uptime}</h2>
    </div>);
  }


}




class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?id=" +
      zip +
      "&appid=6f6c7102b026b65f62443f5f3b6b8783&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    console.log(weatherData);
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Температура: {weatherData.main.temp}°</p>
        <p>Максимальная: {weatherData.main.temp_max}°</p>
        <p>Минимальная: {weatherData.main.temp_min}°</p>
        <p>Скорость ветра: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                Температура
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <Grid>
            <Row>
              <Col className="col-3">
                <h3>Выберете город</h3>
                <Nav className="flex-column"
                  bsStyle="pills"
                  stacked
                  activeKey={activePlace}
                  onSelect={index => {
                    this.setState({ activePlace: index });
                  }}
                >
                  {PLACES.map((place, index) => (
                    <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                  ))}
                </Nav>
              </Col>
              <Col className="col">
                <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />

              </Col>

            </Row>
            <Huita/>
          </Grid>

        </div>
      );
  }
}

export default App;
