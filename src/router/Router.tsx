import DashboardHome from '@/components/DashboardHome';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import Login from '@/pages/Auth/Login';
import Registration from '@/pages/Auth/Registration';
import ResetPasswordPage from '@/pages/Auth/ResetPassword';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import Home from '@/pages/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Registration />,
	},
	{
		path: '/verify-email',
		element: <VerifyEmail />,
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '/reset-password/:token',
		element: <ResetPasswordPage />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: '/dashboard',
				element: <DashboardLayout />,
				children: [
					{
						index: true,
						element: <DashboardHome />,
					},
					// Add more protected routes here
				],
			},
		],
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
