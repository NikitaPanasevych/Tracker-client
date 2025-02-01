import axios from 'axios';

export const apiClient = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add request interceptor for JWT
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Handle token expiration
			localStorage.removeItem('accessToken');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const apiError = error.response?.data;

		if (apiError) {
			return Promise.reject({
				message: apiError.message,
				statusCode: apiError.statusCode,
			});
		}

		return Promise.reject(error);
	}
);
