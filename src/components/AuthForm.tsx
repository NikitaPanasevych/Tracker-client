import AlertDialogComponent from './AlertDialogComponent';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarLoader } from 'react-spinners';
import { useLogin, useRegister, useResendConfirmation } from '@/hooks/use-auth';
import { useNavigate, Link } from 'react-router-dom';

const authFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5).max(50),
});

const AuthForm = ({ type }: { type: 'login' | 'register' }) => {
	const navigate = useNavigate();
	const [showResendDialog, setShowResendDialog] = useState(false);

	const { mutate: login, isPending: isLoginPending, error: loginError } = useLogin();
	const { mutate: resendConfirmation, isPending: isResendPending, error: resendError } = useResendConfirmation();
	const { mutate: register, isPending: isRegisterPending, error: registerError } = useRegister();

	const error = type === 'login' ? loginError : registerError;
	const isPending = type === 'login' ? isLoginPending : isRegisterPending;

	const form = useForm<z.infer<typeof authFormSchema>>({
		resolver: zodResolver(authFormSchema),
		defaultValues: { email: '', password: '' },
	});

	const handleSubmit = async (values: z.infer<typeof authFormSchema>) => {
		try {
			if (type === 'login') {
				await login(values, {
					onSuccess: () => navigate('/dashboard'),
				});
			} else {
				await register(values, {
					onSuccess: () => {
						setShowResendDialog(true);
					},
				});
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const getErrorMessage = () => {
		if (!error) return null;
		console.log(error);

		return error.message;
	};

	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle className="text-xl">{type === 'login' ? 'Login' : 'Register'}</CardTitle>
				<CardDescription>Enter your credentials below to continue</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form className="space-y-6 mb-2" onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="my-4">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>

						<Button className="w-full" disabled={isPending} type="submit">
							{isPending ? <BarLoader color="#ffffff" width={80} /> : type === 'login' ? 'Login' : 'Register'}
						</Button>

						{error && (
							<div className=" bg-rose-200 rounded-lg text-error border-error text-center p-2">
								<p>{getErrorMessage()}</p>
							</div>
						)}
					</form>

					{showResendDialog && type === 'register' && (
						<AlertDialogComponent
							isOpen={showResendDialog}
							onOpenChange={setShowResendDialog}
							type="emailConfirmation"
							handleResendConfirmation={() => {
								if (!isResendPending) {
									resendConfirmation(form.getValues('email'));
									console.log('Resending confirmation email...');
								}
								console.log('Resending confirmation email...');
							}}
						/>
					)}
				</Form>

				<div className="flex justify-center items-center mt-4">
					<span className="text-sm">
						{type === 'login' ? "Don't have an account?" : 'Already have an account?'}
					</span>
					<Link
						to={type === 'login' ? '/register' : '/login'}
						className="ml-2 text-sm font-medium text-purple-500 hover:text-purple-600"
					>
						{type === 'login' ? 'Register' : 'Login'}
					</Link>
				</div>

				<Separator className="my-6" />
				<div className="flex justify-center items-center mt-4">
					<span>
						Forgot your password?{' '}
						<Link to="/forgot-password">
							<span className="font-medium text-sm text-purple-500 hover:text-purple-600">Reset it</span>
						</Link>
					</span>
				</div>
			</CardContent>
		</>
	);
};

export default AuthForm;
