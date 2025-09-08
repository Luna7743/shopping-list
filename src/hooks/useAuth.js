// 認証用カスタムフック

import { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
//下記が外部ライブラリ（Firebase SDK）から持ってきているもの
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export function useAuth() {
  //user の状態管理
  const [user, setUser] = useState(null);

  //認証状態の監視
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  //ログイン関数
  const login = async () => {
    await signInWithPopup(auth, provider); // ここで Google ログイン
  };

  //ログアウト関数
  const logout = async () => {
    await signOut(auth);
  };

  //返り値
  return { user, login, logout };
}
