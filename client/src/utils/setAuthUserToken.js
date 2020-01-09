import axios from 'axios';

const setAuthUserToken = userToken => {
    if (userToken) {
        axios.defaults.headers.common['x-auth-token'] = userToken;
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
};

export default setAuthUserToken;