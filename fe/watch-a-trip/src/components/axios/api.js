import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://pls-phi.vercel.app/api',
	// baseURL: 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json'
	},
});
