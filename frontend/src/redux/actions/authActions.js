import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

//check token and get user data
export const getUser = () => (dispatch,getState) =>{ // async func
	//loading user
	dispatch({type: USER_LOADING})

	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}

	if(token){
		config.headers['auth-tok']
	}
	axios.get('/user/auth', config)
	.then(res => dispatch({
		type:USER_LOADED,
		payload: res.data

	})) 
	.catch(err =>{
		dispatch({
			type: LOGIN_FAIL
		})
	})
}