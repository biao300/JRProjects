import React from 'react';
import Temprature from './Temprature';
import Detail from './Detail';
import OtherCity from './OtherCity';
import Weekly from './Weekly';


/**
 * https://openweathermap.org/api
 * // https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
 */

let url_base = "https://api.openweathermap.org/data/2.5/weather";
let api_key = "3c8a6822afb89f8a6e9ba88e40c5ef0d";

// city ids
let melbourne = "2158177";


function GetWeatherByCityId(cityid, handleWeatherChange) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //can get correct data here but can't pass out
          //console.log(this.responseText);
          
          handleWeatherChange(JSON.parse(this.responseText));
          // will get undefined if just use return...
          //return this.responseText;
        }
      };
      xhttp.open("GET", `${url_base}?id=${cityid}&appid=${api_key}`, true);
      xhttp.send();
}



class App extends React.Component {
    constructor(props) {
        super(props);

        console.log("App constructor");
        this.state = {
            data:undefined,
        };

        this.handleWeatherChange = this.handleWeatherChange.bind(this);
    }

    componentDidMount() {
        console.log("App did mount");
        GetWeatherByCityId("2158177", this.handleWeatherChange);
    }

    handleWeatherChange(newWeather) {
        this.setState({
            data: newWeather,
        })
    }

    render() {
        console.log("App render()");

        const data = this.state.data;
        console.log(data);

        return (
            <div className="container">
                <div className="container__current">
                    <div className="container__current__left">
                        <div className="container__current__left__up">
                            <Temprature data={{
                                temprature: data === undefined ? "0" : (data.main.temp - 273.15), 
                                weather: data === undefined ? "" : data.weather[0].main
                            }}/>
                        </div>
                        <div className="container__current__left__down">
                            <Detail data={{
                                line1: "Humidity", 
                                line2: data === undefined ? "0" : data.main.humidity + "%"
                            }} />
                            <p>|</p>
                            <Detail data={{
                                line1: "Wind", 
                                line2: data === undefined ? "0" : data.wind.speed + "m/s"
                            }} />
                        </div>
                    </div>
                    <div className="container__current__right">
                        {data === undefined ? "" : data.name}
                    </div>
                </div>

                <div className="container__others">
                    <div className="container__others__left">
                        <OtherCity data={{city: "Sydney", temprature: "18", weather: "Sunny"}}/>
                        <OtherCity data={{city: "Brisbane", temprature: "22", weather: "Cloudy"}}/>
                        <OtherCity data={{city: "Camberra", temprature: "10", weather: "Rainny"}}/>
                        <OtherCity data={{city: "Perth", temprature: "9", weather: "Windy"}}/>
                    </div>
                    <div className="container__others__line"></div>
                    <div className="container__others__right">
                        <Weekly data={{weekday: "MON", temprature: "18", weather: "Sunny"}}/>
                        <Weekly data={{weekday: "TUE", temprature: "17", weather: "Cloudy"}}/>
                        <Weekly data={{weekday: "WED", temprature: "16", weather: "Rainny"}}/>
                        <Weekly data={{weekday: "THU", temprature: "11", weather: "Windy"}}/>
                        <Weekly data={{weekday: "FRI", temprature: "14", weather: "Sunny"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

// 定制的组建名首字母一定要大写
// 为什么要引入 React?
// html attrs 的另命名

/*
sass styles\style.scss styles\style.css
npm run build
*/