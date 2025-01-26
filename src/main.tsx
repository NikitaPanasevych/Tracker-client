import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Router from './router/Router';
import { QueryProvider } from './providers/QueryClientProvider';
import { AuthProvider } from './providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</QueryProvider>
	</StrictMode>
);
