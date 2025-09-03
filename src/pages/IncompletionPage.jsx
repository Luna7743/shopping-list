// 未購入

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection, //コレクションやドキュメントを参照
  addDoc, //データを作る
  onSnapshot, //データを読む
  doc, //コレクションやドキュメントを参照
  updateDoc, //データを更新
  deleteDoc, //データを消す
  serverTimestamp, //時間を記録
} from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import AddItemForm from '../components/AddItemForm';
import ItemList from '../components/ItemList';
import EditModal from '../components/EditModal';
import AddItemSort from '../components/AddItemSort';

const IncompletionPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  return (
    <>
      <Header />
      <main></main>
    </>
  );
};

export default IncompletionPage;
