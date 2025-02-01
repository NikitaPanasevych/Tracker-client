import AuthLayout from '@/components/AuthLayout';
import React from 'react';

const VerifyEmail = () => {
	return (
		<AuthLayout>
			<div className="flex flex-col items-center justify-center p-10">
				<h1 className="text-2xl font-bold">Verify your email</h1>
				<p className="text-center">
					We have sent you an email with a link to verify your email address. Please click on the link to verify
					your email.
				</p>
			</div>
		</AuthLayout>
	);
};

export default VerifyEmail;
