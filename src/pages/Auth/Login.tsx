import AuthForm from '@/components/AuthForm';
import AuthLayout from '@/components/AuthLayout';

const Login = () => {
	return (
		<AuthLayout>
			<AuthForm type="login" />
		</AuthLayout>
	);
};

export default Login;
