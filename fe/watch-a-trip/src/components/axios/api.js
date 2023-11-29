import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://172.20.10.3:3000/api',
	// baseURL: 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json'
	},
});
