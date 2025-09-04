//ルーティング＆認証制御
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useAuth } from './hooks/useAuth';
import IncompletionPage from './pages/IncompletionPage';
import CompletionPage from './pages/CompletionPage';
import Login from './components/Login';

function App() {
  const { user } = useAuth();
  return (
    <>
      <div>
        {user ? (
          <Routes>
            <Route path="/incompletion" element={<IncompletionPage />} />
            <Route path="/completion" element={<CompletionPage />} />
            {/* デフォルトは未購入一覧にリダイレクト */}
            <Route path="*" element={<Navigate to="/incompletion" />} />
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
