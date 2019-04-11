import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    week: 1
}

const setWeekData = (state, action) => {
    return updateObject(state, {week: action.week});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NBA_WEEK: return setWeekData(state, action);
        case actionTypes.SET_NBA_WEEK: return setWeekData(state, action);
        default: return state;
    }
}

export default reducer;