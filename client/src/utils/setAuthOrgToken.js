import axios from 'axios';

const setAuthOrgToken = organizationToken => {
    if (organizationToken) {
        axios.defaults.headers.common['y-auth-token'] = organizationToken;
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
};

export default setAuthOrgToken;