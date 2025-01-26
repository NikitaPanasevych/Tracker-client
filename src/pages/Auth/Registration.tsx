import AuthForm from '@/components/AuthForm';
import AuthLayout from '@/components/AuthLayout';
import React from 'react';

const Registration = () => {
	return (
		<AuthLayout>
			<AuthForm type="register" />
		</AuthLayout>
	);
};

export default Registration;
