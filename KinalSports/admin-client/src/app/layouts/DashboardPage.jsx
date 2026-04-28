import { useAuthStore } from '../../features/auth/store/authStore.js';
import { DashboardContainer } from '../../shared/components/layouts/DashboardContainer.jsx';
import { Outlet } from 'react-router-dom';
import { UiConfirmHost } from '../../features/auth/components/ConfirmModal.jsx';

export const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  return (
    <DashboardContainer user={user} onLogout={logout}>
      <Outlet />
    </DashboardContainer>
  );
};
