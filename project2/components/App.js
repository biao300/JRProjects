import React from 'react';
import Temprature from './Temprature';
import Detail from './Detail';

const App = () => (
    <div className="container">
        <div className="container__current">
            <div className="container__current__left">
                <div className="container__current__left__up">
                    <Temprature data={{temprature: "9", weather: "Rainy"}}/>
                </div>
                <div className="container__current__left__down">
                    <Detail data={{line1: "Humidity", line2: "4%"}} />
                    <p>|</p>
                    <Detail data={{line1: "Wind", line2: "12KTM"}} />
                </div>
            </div>
            <div className="container__current__right">
                Melbourne
            </div>
        </div>

        <div className="container__others">
            <div className="container__others__left">
                cities
            </div>
            <div className="container__others__right">
                five days
            </div>
        </div>
    </div>
);

export default App;

// 定制的组建名首字母一定要大写
// 为什么要引入 React?
// html attrs 的另命名

/*
sass styles\style.scss styles\style.css
npm run build
*/