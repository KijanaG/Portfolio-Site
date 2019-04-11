import * as actionTypes from './actionTypes';
import axios from 'axios';
import URL from '../../assets/APIKeys/WeatherAPI.json';

const setWeekData = (week) => {
    return {
        type: actionTypes.GET_NBA_WEEK,
        week: week
    }
}

export const getNBAWeek = () => {
    return async dispatch => {
        await axios.get(URL.prod+"/api/NBA/week")
            .then(res => {
                updateWeek(res.data);
                dispatch(setWeekData(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const setWeek = (week) => {
    return {
        type: actionTypes.SET_NBA_WEEK,
        week: week
    }
}

const updateWeek = (week) => {
    axios({
        url: '/api/NBA/update',
        method: 'POST',
        baseURL: URL.prod,
        params: {
            week: week
        }
    }).then()
        .catch(err => console.log(err));
}
