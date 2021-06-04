import React from 'react';

class OtherCity extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <p className="container__others__left__city">
                {this.props.data.city + ' ' + this.props.data.temprature + 'º '}
                &nbsp;&nbsp;
                <img src={`images/${this.props.data.weather}.png`} className="container__others__left__city__image" />
            </p>
        );
    }
}

export default OtherCity;