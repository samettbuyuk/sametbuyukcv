import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './lib/firebase';
import PublicCV from './pages/PublicCV';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      clearTimeout(timeout);
      setUser(u);
      setLoading(false);
    });
    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only the specified email can access the admin panel
  const isAdmin = user?.email === 'samettbuyuk@gmail.com';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicCV />} />
        <Route path="/login" element={user ? <Navigate to="/admin" /> : <Login />} />
        <Route 
          path="/admin/*" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
