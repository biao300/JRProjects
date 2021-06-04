import React from 'react';
import Temprature from './Temprature';
import Detail from './Detail';
import OtherCity from './OtherCity';
import Weekly from './Weekly';


/**
 * https://openweathermap.org/api
 * // https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
 * // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
 * // this is paid service lol:
 * // https://api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={API key}
 */

let url_base = "https://api.openweathermap.org/data/2.5";
let api_key = "3c8a6822afb89f8a6e9ba88e40c5ef0d";

// city coords
// [latitude, longitude]
let melbourne_coords = [-37.814, 144.9633];

let city_list = [
    //"2158177", // Melbourne
    "2147714", // Sydney
    "2174003", // Brisbane
    "2172517", // Canberra
    "2063523", // Perth
    "2073124", // Darwin
];

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];


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
      xhttp.open("GET", `${url_base}/weather?id=${cityid}&appid=${api_key}`, true);
      xhttp.send();
}

function GetCurrentCityWeather(coords, callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", `${url_base}/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=minutely,hourly,alerts&appid=${api_key}`, true);
    xhttp.send();
}

function Kelvin2Celsius(temp) {
    if (Number(temp) !== NaN) {
        return parseInt(Number(temp) - 273.15);
    } else {
        return 0;
    }
}

function Timezone2City(timezone) {
    let arr = timezone.split("/");
    return arr[1];
}

function Unix2Date(unix) {
    let date = new Date(unix * 1000);

    return date;
}





class App extends React.Component {
    constructor(props) {
        super(props);

        console.log("App constructor");
        this.state = {
            current: undefined,
            others:[],
        };

        // must do this or will get "Cannot read property 'setState' of undefined"
        this.handleWeatherChange = this.handleWeatherChange.bind(this);
        this.handleWeeklyChange = this.handleWeeklyChange.bind(this);
    }

    componentDidMount() {
        console.log("App did mount");

        GetCurrentCityWeather(melbourne_coords, this.handleWeeklyChange);

        for (let i = 0; i < city_list.length; i ++)
        {
            GetCityWeatherById(city_list[i], this.handleWeatherChange);
        }
        
        Unix2Date("1622858400");
    }

    handleWeatherChange(newWeather) {
        // make a copy of state
        let {others} = this.state;
        // change
        others.push(newWeather);

        // set & re-render
        this.setState({
            others: others,
        });
    }

    handleWeeklyChange(newWeekly) {
        let {current} = this.state;
        current = newWeekly;

        this.setState({
            current: current,
        });
    }

    render() {
        console.log("App render()");

        const others = this.state.others;
        //console.log(data);
        const current = this.state.current;
        console.log(current);

        const fiveDays = (current === undefined) ? [] : current.daily.slice(1,6);

        return (
            <div className="container">
                <div className="container__current">
                    <div className="container__current__left">
                        <div className="container__current__left__up">
                            <Temprature data={{
                                temprature: current === undefined ? "0" : Kelvin2Celsius(current.current.temp), 
                                weather: current === undefined ? "" : current.current.weather[0].main
                            }}/>
                        </div>
                        <div className="container__current__left__down">
                            <Detail data={{
                                line1: "Humidity", 
                                line2: current === undefined ? "0" : current.current.humidity + "%"
                            }} />
                            <p>|</p>
                            <Detail data={{
                                line1: "Wind", 
                                line2: current === undefined ? "0" : current.current.wind_speed + " m/s"
                            }} />
                        </div>
                    </div>
                    <div className="container__current__right">
                        {current === undefined ? "" : Timezone2City(current.timezone)}
                    </div>
                </div>

                <div className="container__others">
                    <div className="container__others__left">
                        {others.map((item, index) => {
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
                        {fiveDays.map((item, index) => {
                            if (item !== undefined) {
                                let date = Unix2Date(item.dt);
                                return <Weekly key={index} data={{
                                            date: date.getDate() + " " + months[date.getMonth()],
                                            weekday: weekdays[date.getDay()], 
                                            temprature: Kelvin2Celsius(item.temp.day), 
                                            weather: item.weather[0].main}}/>
                            }
                        })}
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