import { AdminAuthContext } from '../context/adminAuthContext';
import { useContext } from 'react';

export const useAdminContext = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw Error(
      'useAdminAuthContext must be used inside an AdminAuthProvider.'
    );
  }
  return context;
};
