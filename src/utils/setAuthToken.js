import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from "../state/store"
import { setCurrentUser } from "../features/auth/actions"

const setAuthToken = token => {
  if (token) {
  	console.log("setAuthToken: YES TOKEN");
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
  	console.log("setAuthToken: NO TOKEN");
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const addToken = token => {
  
	 // Set JWT in localstorage
    localStorage.setItem('jwtToken', token);
    // Create Axios Default Config for x-auth-token
    setAuthToken(token);
    // Decode returned Token
    const decoded = jwt_decode(token);
    // Set Current User in Redux State
    store.dispatch(setCurrentUser(decoded));

}

export const removeToken = () => {
 localStorage.removeItem('jwtToken');
  setAuthToken(false);
  store.dispatch(setCurrentUser({}));
}


