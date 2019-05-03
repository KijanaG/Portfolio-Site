import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    weatherData: [],
    error: false,
    currentLocation: null,
    currentTime: null,
    currentGMT: false,
    locationError: false,
    anyLocation: null,
    anyTime: null,
    anyGMT: false,
    anyError: false,
    backgroundImage: "null"
};


const setWeatherData = (state, action) => {
    var currentState = state.weatherData;
    currentState.push(action.weatherData);
    return updateObject(state, currentState);
}

const setLocationData = (state, action) => {
    return updateObject(state, {
        currentLocation: action.currentLocation,
        currentTime: action.currentTime,
        currentGMT: action.currentGMT,
        locationError: false
    })
}

const setAnyLocationData = (state, action) => {
    return updateObject(state, {
        anyLocation: action.anyLocation,
        anyTime: action.anyTime,
        anyGMT: action.anyGMT,
        anyError: false
    })
}

const fetchWeatherFailed = (state, action) => {
    return updateObject(state, { error: true })
}

const locationDataFailed = (state, action) => {
    return updateObject(state, { locationError: true })
}

const anyLocationDataFailed = (state, action) => {
    return updateObject(state, { anyError: true })
}

const changePhoto = (state, action) => {
    return updateObject(state, {backgroundImage: action.photo})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_WEATHER_DATA: return setWeatherData(state, action);
        case actionTypes.FETCH_WEATHER_FAILED: return fetchWeatherFailed(state, action);
        case actionTypes.SET_LOCATION_DATA: return setLocationData(state, action);
        case actionTypes.FETCH_LOCATION_FAILED: return locationDataFailed(state, action);
        case actionTypes.SET_ANY_LOCATION_DATA: return setAnyLocationData(state, action);
        case actionTypes.FETCH_ANY_LOCATION_FAILED: return anyLocationDataFailed(state, action);
        case actionTypes.CHANGE_PHOTO: return changePhoto(state, action);
        default: return state;
    }
}

export default reducer;