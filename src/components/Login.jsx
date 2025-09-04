import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  return (
    <>
      <div className="login-area">
        <p>お買い物リストをはじめよう!</p>
        <button onClick={login}>Googleでログイン</button>
      </div>
    </>
  );
};

export default Login;
