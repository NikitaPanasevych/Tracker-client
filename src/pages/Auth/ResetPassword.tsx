import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '@/api/client';
import AuthLayout from '@/components/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ResetPasswordPage() {
	const { token } = useParams();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();

	const { data: isValid } = useQuery({
		queryKey: ['validateToken', token],
		queryFn: () => apiClient.get(`/auth/validate-reset-token/${token}`),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: ({ newPassword }: { newPassword: string }) =>
			apiClient.post('/auth/reset-password', { token, newPassword }),
		onSuccess: () => navigate('/login'),
	});

	if (!isValid) return <div>Validating token...</div>;

	return (
		<AuthLayout>
			<div className="max-w-md mx-auto p-4">
				<h2 className="text-center font-semibold mb-2"> Reset password</h2>
				<form
					className=" flex flex-col gap-4"
					onSubmit={handleSubmit(({ newPassword }) => mutate({ newPassword }))}
				>
					<Input {...register('newPassword')} type="password" placeholder="New password" />
					<Button disabled={isPending}>{isPending ? 'Resetting...' : 'Submit'}</Button>
				</form>
			</div>
		</AuthLayout>
	);
}
