import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherApp from './Weather/WeatherApp';
import WorldMap from './WorldMap/WorldMap';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';


class World extends Component {
    state = {
        cities: [
            'Seattle',
            'Barcelona',
            'London',
            'Tokyo',
            'Sydney'
        ]
    }

    componentWillMount() {
        if(this.props.weatherData.length === 0) {
            for (var city of this.state.cities)
                this.props.onInitializeData(city);
        }
        if(this.props.backgroundImage !== "montana.jpg") {
            this.props.changePhoto("montana.jpg")
        }
    }

    render() {
        return (
            <div>
                <WeatherApp />
                <WorldMap />
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.worldData.weatherData,
        backgroundImage: state.worldData.backgroundImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitializeData: (city) => dispatch(actions.fetchWeatherData(city)),
        changePhoto: (photo) => dispatch(actions.changePhoto(photo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(World, axios));