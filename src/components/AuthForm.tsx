import AlertDialogComponent from './AlertDialogComponent';
import { useState } from 'react';
//utils
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
//shadcn
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarLoader } from 'react-spinners';
import { useLogin, useRegister } from '@/hooks/use-auth'; // Import your auth hooks
import { useNavigate } from 'react-router-dom';

const authFormSchema = () => {
	const baseSchema = z.object({
		email: z.string().email(),
		password: z.string().min(5).max(50),
	});

	return baseSchema;
};

const AuthForm = ({ type }: { type: 'login' | 'register' }) => {
	const [errorMessage, setErrorMessage] = useState('');
	let navigate = useNavigate();

	const { mutate: login, isPending: isLoginPending } = useLogin();
	const { mutate: register, isPending: isRegisterPending } = useRegister();
	const isPending = type === 'login' ? isLoginPending : isRegisterPending;

	const formSchema = authFormSchema();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setErrorMessage('');
		try {
			if (type === 'login') {
				await login(values);
			} else {
				await register(values);
			}
		} catch (error: any) {
			if (error.message) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('An unexpected error occurred. Please try again.');
			}
			console.error('Error during submission:', error);
		} finally {
			navigate('/dashboard');
		}
	}

	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle className="text-xl">{type === 'login' ? 'Login' : 'Register'}</CardTitle>
				<CardDescription>Enter your credentials below to continue</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-6 mb-2" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="my-4">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage className="text-red body-2 ml-2" />
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
									<FormMessage className="text-red body-2 ml-2" />
								</FormItem>
							)}
						/>
						<Button className="w-full" disabled={isPending} type="submit">
							{isPending ? <BarLoader color="black" /> : type === 'login' ? 'Login' : 'Register'}
						</Button>
						{errorMessage && <p className="  mx-auto rounded-xl text-center text-error">*{errorMessage}</p>}
					</form>
				</Form>

				<div className="body-2 flex justify-center pt-2">
					<p className="text-light-100">
						{type === 'login' ? "Don't have an account?" : 'Already have an account?'}
					</p>
					<a href={type === 'login' ? '/register' : '/login'} className="ml-1 font-medium text-brand">
						{type === 'login' ? 'Register' : 'Login'}
					</a>
				</div>
				<Separator className="my-4 px-6" />
			</CardContent>
		</>
	);
};

export default AuthForm;
