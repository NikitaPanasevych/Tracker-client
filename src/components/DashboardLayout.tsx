// src/layouts/DashboardLayout.tsx
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCurrentUser, useLogout } from '@/hooks/use-auth';

const DashboardLayout = () => {
	const { data: user } = useCurrentUser();
	const { mutate: logout } = useLogout();

	return (
		<div className="min-h-screen bg-background">
			<nav className="bg-card border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<Link to="/dashboard" className="text-xl font-bold">
								Expense Tracker
							</Link>
						</div>
						<div className="flex items-center gap-4">
							<span>Welcome {user?.data.email}</span>
							<Button variant="ghost" onClick={() => logout()}>
								Logout
							</Button>
						</div>
					</div>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Outlet />
			</main>
		</div>
	);
};

export default DashboardLayout;
