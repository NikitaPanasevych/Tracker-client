import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Router from './router/Router';
import { QueryProvider } from './providers/QueryClientProvider';
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<AuthProvider>
				<Router />
				<Toaster />
			</AuthProvider>
		</QueryProvider>
	</StrictMode>
);
