import * as actionTypes from './actionTypes';
import axios from 'axios';
import APIKey from '../../assets/APIKeys/WeatherAPI.json';


export const setWeatherData = (data) => {
    return {
        type: actionTypes.SET_WEATHER_DATA,
        weatherData: data
    }
}

export const weatherDataFailed = () => {
    return {
        type: actionTypes.FETCH_WEATHER_FAILED
    }
}

export const locationDataFailed = () => {
    return {
        type: actionTypes.FETCH_LOCATION_FAILED
    }
}
export const setLocationData = (data) => {
    return {
        type: actionTypes.SET_LOCATION_DATA,
        currentGMT: data.currentGMT,
        currentLocation: data.currentLocation,
        currentTime: data.currentTime
    }
}

export const setAnyLocationData = (data) => {
    return {
        type: actionTypes.SET_ANY_LOCATION_DATA,
        anyLocation: data.anyLocation,
        anyGMT: data.anyGMT,
        anyTime: data.anyTime
    }
}

export const anyLocationDataFailed = () => {
    return {
        type: actionTypes.FETCH_ANY_LOCATION_FAILED
    }
}

export const getAnyLocationData = (cityName) => {
    return dispatch => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey['weather'])
            .then(res => {
                let lat = res.data.coord.lat;
                let lng = res.data.coord.lon;
                let obj = {};
                obj[res.data.name] = res.data;
                var timestamp = Math.floor(((new Date()).getTime()) / 1000);
                axios.get("https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + timestamp + "&key=" + APIKey['googleMap'])
                    .then(res => {
                        let anyTime = (res.data.rawOffset + res.data.dstOffset) / 3600;
                        let anyGMT;
                        if (anyTime < 0) {
                            anyGMT = false;
                        } else
                            anyGMT = true;
                        dispatch(setAnyLocationData({ anyLocation: obj, anyGMT: anyGMT, anyTime: anyTime }));
                    })
                    .catch(err => {
                        dispatch(anyLocationDataFailed());
                        // console.log(err);
                    })
            })
            .catch(err => {
                dispatch(anyLocationDataFailed());
                // console.log(err);
            })
    }
}

export const getLocationData = () => {
    return dispatch => {
        axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + APIKey['googleMap'])
            .then(res => {
                let lat = res.data.location.lat;
                let lng = res.data.location.lng;
                axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + APIKey['weather'])
                    .then(res => {
                        let obj = {};
                        obj[res.data.name] = res.data;
                        var timestamp = Math.floor(((new Date()).getTime()) / 1000);
                        axios.get("https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + timestamp + "&key=" + APIKey['googleMap'])
                            .then(res => {
                                let currTime = (res.data.rawOffset + res.data.dstOffset) / 3600;
                                let currentGMT;
                                if (currTime < 0) {
                                    currentGMT = false;
                                } else
                                    currentGMT = true;
                                dispatch(setLocationData({ currentLocation: obj, currentGMT: currentGMT, currentTime: currTime }));
                            })
                            .catch(err => {
                                dispatch(locationDataFailed());
                                // console.log(err);
                            })
                    })
                    .catch(err => {
                        dispatch(locationDataFailed());
                        // console.log(err);
                    })
            })
            .catch(err => {
                dispatch(locationDataFailed());
                // console.log(err);
            })
    }
}

export const fetchWeatherData = (cityName) => {
    return (dispatch) => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey['weather'])
            .then(res => {
                // console.log(res);
                let obj = {};
                obj[res.data.name] = res.data;
                dispatch(setWeatherData(obj));
            })
            .catch(err => {
                dispatch(weatherDataFailed());
                // console.log(err);
            })
    }
}

export const changePhoto = (photo) => {
    return {
        type: actionTypes.CHANGE_PHOTO,
        photo: photo
    }
}