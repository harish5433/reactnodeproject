import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer "+token
  }
  else{
    delete axios.defaults.headers.common['Authorization']
  }
};

export default setAuthToken;

/* import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
export default axios; */