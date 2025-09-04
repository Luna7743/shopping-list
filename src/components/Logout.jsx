import { useAuth } from '../hooks/useAuth';
import { GrLogout } from 'react-icons/gr';

const Logout = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="logout-area">
        <button onClick={logout}>
          <GrLogout className="logout-icon" />
          ログアウト
        </button>
      </div>
    </>
  );
};

export default Logout;
