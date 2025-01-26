import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/use-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { data: user } = useCurrentUser();

	useEffect(() => {
		if (user) {
			// Handle authenticated state
			console.log('Logged in as:', user.email);
		}
	}, [user]);

	return <>{children}</>;
}
