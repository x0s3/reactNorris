// ------------------------------------
// Imports
// ------------------------------------
import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
const GENERATE_USER_DATA = 'GENERATE_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

// ------------------------------------
// Actions
// ------------------------------------

export const generateFakeInfo = () => async (dispatch) => {
    try {
        const response = await axios.get('https://randomuser.me/api/?inc=email,name,location,phone');
        let user = {
            name: response.data.results[0].name.first,
            email: response.data.results[0].email,
            phone: response.data.results[0].phone,
            location: response.data.results[0].location.city
        };
        dispatch({
            type: GENERATE_USER_DATA,
            payload: {user: {...user}, generated: true}
        })
    } catch (error) {
        console.warn(error);
    }
};

export const updateUserInfo = (data) => (dispatch) => {
    let user = {...data};
    dispatch({
        type: UPDATE_USER_DATA,
        payload: {user: {...user}}
    });
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [GENERATE_USER_DATA]: (state, action) => Object.assign({}, state, action.payload),
    [UPDATE_USER_DATA]: (state, action) => Object.assign({}, state, action.payload),
};

// ------------------------------------
// Reducer
// ------------------------------------
/* We are going to persist the user info :) */
const initialState = {user: {name: '', email: '', phone: '', location: ''}, generated: false};
export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}