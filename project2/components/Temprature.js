import React from 'react';

class Temprature extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <p className="temprature">
                <span className="">{this.props.data.temprature}º<br/></span>
                <span className="">{this.props.data.weather}</span>
            </p>
        );
    }
}

export default Temprature;