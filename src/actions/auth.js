import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SAVE_ID,
    REFRESH_TOKEN
} from './types';


export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',

        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL

        })
    }
};


export const refreshToken = (accessToken) => (dispatch) => {
    dispatch({
      type: REFRESH_TOKEN,
      payload: accessToken,
    })
  }

export const IdWorkItem = (projectId) => dispatch => {
    dispatch({
        type: SAVE_ID,
        payload: { projectId }
    })
}



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
