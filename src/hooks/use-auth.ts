import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

export function useLogin() {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: (data) => {
			localStorage.setItem('accessToken', data.data.token);
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: error.message,
			});
		},
	});
}

export function useRegister() {
	return useMutation({
		mutationFn: authApi.register,
	});
}

export function useResendConfirmation() {
	return useMutation({
		mutationFn: authApi.resendConfirmation,
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
	const { toast } = useToast();

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
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: error.message,
			});
		},
	});
}

export function useForgotPassword() {
	return useMutation({
		mutationFn: authApi.forgotPassword,
	});
}

export function useValidateResetToken() {
	return useQuery({
		queryKey: ['validateToken'],
		queryFn: () => authApi.validateResetToken,
	});
}

export function useResetPassword(token: string | undefined) {
	const navigate = useNavigate();
	const { toast } = useToast();

	return useMutation({
		mutationFn: ({ newPassword }: { newPassword: string }) => authApi.resetPassword(newPassword, token),
		onSuccess: () => {
			navigate('/login');
			toast({
				variant: 'success',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			});
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: error.message,
			});
		},
	});
}
