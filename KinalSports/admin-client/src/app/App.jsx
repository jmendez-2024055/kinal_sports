import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes/AppRoutes.jsx';
// FIX: Auth -> auth (consistente con la carpeta real en el proyecto)
import { useAuthStore } from '../features/Auth/store/authStore.js';
import { UiConfirmHost } from '../features/Auth/components/ConfirmModal.jsx';

export const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            fontFamily: 'inherit',
            fontWeight: '600',
            fontSize: '1rem',
            borderRadius: '8px',
          },
        }}
      />
      <UiConfirmHost />
      <AppRoutes />
    </>
  );
};
