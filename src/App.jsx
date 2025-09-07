//ルーティング＆認証制御
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useAuth } from './hooks/useAuth';
import Login from './components/Login';
import UnPurchased from './pages/UnPurchased';
import Purchased from './pages/Purchased';

function App() {
  const { user } = useAuth();
  return (
    <>
      <div>
        {user ? (
          <Routes>
            <Route path="/unpurchased" element={<UnPurchased />} />
            <Route path="/purchased" element={<Purchased />} />
            {/* デフォルトは未購入一覧にリダイレクト */}
            <Route path="*" element={<Navigate to="/unpurchased" />} />
          </Routes>
        ) : (
          // 🔹 ログイン画面
          <div className="login-layout">
            <Login />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
