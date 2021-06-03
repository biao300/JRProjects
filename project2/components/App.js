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
let sydney = "2147714";

let city_list = [
    "2158177", // Melbourne
    "2147714", // Sydney
    "2174003", // Brisbane
    "2172517", // Canberra
    "2063523", // Perth
    //"2073124", // Darwin
];


function GetCityWeatherById(cityid, callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //can get correct data here but can't pass out
          //console.log(this.responseText);
          
          callback(JSON.parse(this.responseText));
          // will get undefined if just use return...
          //return this.responseText;
        }
      };
      xhttp.open("GET", `${url_base}?id=${cityid}&appid=${api_key}`, true);
      xhttp.send();
}

function Kelvin2Celsius(temp) {
    if (Number(temp) !== NaN) {
        return parseInt(Number(temp) - 273.15);
    } else {
        return 0;
    }
}



class App extends React.Component {
    constructor(props) {
        super(props);

        console.log("App constructor");
        this.state = {
            weathers:[],
        };

        // must do this or will get "Cannot read property 'setState' of undefined"
        this.handleWeatherChange = this.handleWeatherChange.bind(this);
    }

    componentDidMount() {
        console.log("App did mount");

        for (let i = 0; i < city_list.length; i ++)
        {
            GetCityWeatherById(city_list[i], this.handleWeatherChange);
        }
    }

    handleWeatherChange(newWeather) {
        // make a copy of state
        let {weathers} = this.state;
        // change
        weathers.push(newWeather);

        // set & re-render
        this.setState({
            weathers: weathers,
        });
    }

    render() {
        console.log("App render()");

        const data = this.state.weathers;
        //console.log(data);

        return (
            <div className="container">
                <div className="container__current">
                    <div className="container__current__left">
                        <div className="container__current__left__up">
                            <Temprature data={{
                                temprature: data[0] === undefined ? "0" : Kelvin2Celsius(data[0].main.temp), 
                                weather: data[0] === undefined ? "" : data[0].weather[0].main
                            }}/>
                        </div>
                        <div className="container__current__left__down">
                            <Detail data={{
                                line1: "Humidity", 
                                line2: data[0] === undefined ? "0" : data[0].main.humidity + "%"
                            }} />
                            <p>|</p>
                            <Detail data={{
                                line1: "Wind", 
                                line2: data[0] === undefined ? "0" : data[0].wind.speed + "m/s"
                            }} />
                        </div>
                    </div>
                    <div className="container__current__right">
                        {data[0] === undefined ? "" : data[0].name}
                    </div>
                </div>

                <div className="container__others">
                    <div className="container__others__left">
                        {data.map((item, index) => {
                            // use map() to render array elements, but need a key for DOM??
                            return <OtherCity key={index} data={{
                                        city: item === undefined ? "" : item.name, 
                                        temprature: item === undefined ? "0" : Kelvin2Celsius(item.main.temp), 
                                        weather: item === undefined ? "" : item.weather[0].main
                                    }}/>
                        })}

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