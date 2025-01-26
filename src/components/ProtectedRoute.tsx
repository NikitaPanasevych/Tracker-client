// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/use-auth';
import { BarLoader } from 'react-spinners';

const ProtectedRoute = () => {
	const { data: user, isLoading, isError } = useCurrentUser();
	const location = useLocation();

	if (isLoading) {
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<BarLoader className=" h-12 w-12" />
			</div>
		);
	}

	if (!user || isError) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
