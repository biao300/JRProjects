import React from 'react';

class OtherCity extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <p className="container__others__left__city">
                {this.props.data.city + ' ' + this.props.data.temprature + 'º ' + this.props.data.weather}
            </p>
        );
    }
}

export default OtherCity;