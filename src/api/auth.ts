import { apiClient } from './client';

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = LoginPayload;

export const authApi = {
	login: (payload: LoginPayload) => apiClient.post<{ token: string }>('/auth/login', payload),

	register: (payload: RegisterPayload) => apiClient.post<{ id: string; email: string }>('/auth/register', payload),

	getCurrentUser: () => apiClient.get<{ id: string; email: string }>('/auth/me'),

	logout: () => apiClient.post<void>('/auth/logout'),

	resendConfirmation: (email: string) => apiClient.post<void>('/auth/resend-confirmation', { email }),
};
