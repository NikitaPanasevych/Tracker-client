// ForgotPasswordPage.tsx
import { useForm } from 'react-hook-form';
import AuthLayout from '@/components/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForgotPassword } from '@/hooks/use-auth';

export default function ForgotPasswordPage() {
	const { register, handleSubmit } = useForm();
	const { mutate, isPending, isSuccess } = useForgotPassword();

	return (
		<AuthLayout>
			<div className="max-w-md mx-auto p-6 gap-2 flex flex-col">
				{isSuccess ? (
					<div className="text-center">
						<h2>Check Your Email</h2>
						<p>We've sent password reset instructions to your email</p>
					</div>
				) : (
					<>
						<h2 className=" text-center font-semibold ">Recover your password</h2>
						<form className=" flex flex-col gap-4" onSubmit={handleSubmit(({ email }) => mutate(email))}>
							<Input {...register('email')} type="email" placeholder="Enter your email" />
							<Button disabled={isPending}>{isPending ? 'Sending...' : 'Reset Password'}</Button>
						</form>
					</>
				)}
			</div>
		</AuthLayout>
	);
}
