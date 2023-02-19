import Axios from 'axios';

const axios = Axios.create();
axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
	(configuration) => {
		const token = localStorage.getItem('@token');
		const res = JSON.parse(localStorage.getItem("authUser"));
		if (res) {
			configuration.headers['Authorization'] = `Bearer ${token}`;
		}
		return configuration;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default axios;
