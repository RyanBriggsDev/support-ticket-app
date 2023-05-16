import { useAdminContext } from './useAdminContext';

export const useAdminLogout = () => {
  const { adminDispatch } = useAdminContext();
  const adminLogout = async () => {
    localStorage.removeItem('admin');
    adminDispatch({ type: 'LOGOUT', payload: null });
  };
  return { adminLogout };
};
