import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import { useEffect, useState } from 'react';

export function MyRoutes() {
  const authContext = UserAuth();
  const user = authContext ? authContext.user : null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    setTimeout(() => {
      if (loading) return <p>Loading...</p>;
    }, 2000);
    return user ? children : <Navigate to={'/login'} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
