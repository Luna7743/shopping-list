import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { user, login, logout } = useAuth();
  return (
    <>
      <div className="login-area">
        {user ? (
          <button onClick={logout}>ログアウト</button>
        ) : (
          // 未ログイン時はログインボタンのみ
          <button onClick={login}>Googleでログイン</button>
        )}
      </div>
    </>
  );
};

export default Login;
