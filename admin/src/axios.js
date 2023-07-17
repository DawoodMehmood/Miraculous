import Axios from 'axios';
import BASE_URL from '../config';
const axios = Axios.create({
	baseURL: `${BASE_URL}/api`,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export default axios;
