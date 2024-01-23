// App.js
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRouter from './routers/PrivateRouter';
import Dashboard from './components/Dashboard';
import PublicRouter from './routers/PublicRouter';
import LoginPage from './components/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserByToken } from './redux/auth/authAction';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { isLogin, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loginUserByToken()); 
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route path="/*" element={<PrivateRouter />} />
      <Route path="/auth/*" element={<PublicRouter />} />
    </Routes>
  );
}

export default App;
