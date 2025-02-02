import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useResetPassword, useValidateResetToken } from '@/hooks/use-auth';

export default function ResetPasswordPage() {
	const { token } = useParams();
	const { register, handleSubmit } = useForm();

	const { data: isValid } = useValidateResetToken();

	const { mutate, isPending } = useResetPassword(token);

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
