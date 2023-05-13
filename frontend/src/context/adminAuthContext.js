import { createContext, useReducer, useEffect } from 'react';

export const AdminAuthContext = createContext();
export const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { admin: action.payload };
    case 'LOGOUT':
      return { admin: null };
    default:
      return state;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [state, agentDispatch] = useReducer(AdminAuthContext, { admin: null });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin) agentDispatch({ type: 'LOGIN', payload: admin });
  }, []);

  console.log('AdminAuthContext state: ', state);

  return (
    <AdminAuthContext.Provider value={{ ...state, agentDispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
