import React from 'react';
import Temprature from './Temprature';

const App = () => (
    <div className="container">
        <div className="container__current">
            <div className="container__current__left">
                <Temprature data={{temprature: "9", weather: "Rainy"}}/>
            </div>
        </div>
        <div className="container__other">others</div>
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