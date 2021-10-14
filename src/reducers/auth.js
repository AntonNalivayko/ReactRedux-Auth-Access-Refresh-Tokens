import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SAVE_ID,
    REFRESH_TOKEN
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: true,
    error: false,
    idProject: ''
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                error: false
            }

        case LOGIN_FAIL:
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                error: true
            }

        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                error: false
            }
        case SAVE_ID:
            return {
                ...state,
                idProject: payload.projectId
            }

        case REFRESH_TOKEN:
            return {
                ...state,
                user: { ...user, accessToken: payload },
            };

        default:
            return state
    }
};
