import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: (data) => {
			localStorage.setItem('accessToken', data.data.token);
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
		},
	});
}

export function useRegister() {
	return useMutation({
		mutationFn: authApi.register,
	});
}

export function useCurrentUser() {
	return useQuery({
		queryKey: ['currentUser'],
		queryFn: authApi.getCurrentUser,
		enabled: !!localStorage.getItem('accessToken'),
	});
}

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: () => {
			localStorage.removeItem('accessToken');
			return authApi.logout();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			queryClient.clear();
			navigate('/login');
		},
		onError: (error) => {
			console.error('Logout failed:', error);
		},
	});
}
