import axiosInstance from '../../configs/axiosConfig';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const response = await axiosInstance.post("auth/login", credentials);
        localStorage.setItem('token', response.token);
        dispatch(loginSuccess(response.data));

    } catch (error) {
        console.log(error);
        dispatch(loginFailure(error?.message));
    }
}

export const loginUserByToken = () => async (dispatch) => {
    try {
        if (localStorage.getItem('token')) {
            dispatch(loginStart());
            const response = await axiosInstance.get("auth/login-by-token");
            localStorage.setItem('token', response.token);
            dispatch(loginSuccess(response.data));
        }else{
            dispatch(loginFailure(""));
        }
    } catch (error) {
        console.log(error);
        dispatch(loginFailure(error?.message));
    }
}

export const logoutUser = () => async (dispatch) => {
    console.log("redux");
    localStorage.removeItem("token");
    dispatch(loginFailure(""));
    
}

