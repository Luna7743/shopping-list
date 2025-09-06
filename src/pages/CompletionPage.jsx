// 購入済み

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection, //コレクションやドキュメントを参照
  onSnapshot, //データを読む
  doc, //コレクションやドキュメントを参照
  updateDoc, //データを更新
  deleteDoc, //データを消す
} from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import ItemList from '../components/ItemList';
import AddItemSort from '../components/AddItemSort';

const CompletionPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedItems, setSortedItems] = useState([]);

  // Firestore リアルタイム取得
  useEffect(() => {
    //ログアウト状態のときに Firestore にアクセスしないように
    if (!user) return;

    //Firestore の参照を作る
    const itemsRef = collection(db, 'users', user.uid, 'items');
    //onSnapshot でリアルタイム監視
    const unsub = onSnapshot(itemsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data.filter((item) => item.completed)); //未購入のみ
    });
    return () => unsub();
  }, [user]);

  // 戻す（未購入に戻す）
  const handleBack = async () => {
    for (const id of checkedIds) {
      //Firestore の参照を作る
      const docRef = doc(db, 'users', user.uid, 'items', id);
      //updateDoc でフィールドを更新
      await updateDoc(docRef, { completed: false });
    }
    //チェック状態をリセット
    setCheckedIds([]);
  };

  //削除
  const handleDelete = async () => {
    const ok = window.confirm('選択したリストを削除しますか？');
    if (!ok) return; // キャンセルなら何もしない

    for (const id of checkedIds) {
      const docRef = doc(db, 'users', user.uid, 'items', id);
      await deleteDoc(docRef);
    }
    setCheckedIds([]);
  };

  //検索適用
  const filteredItems =
    //ソート済みリストがある場合はそれを優先、なければ元の items リストを使用
    (sortedItems.length > 0 ? sortedItems : items).filter(
      //大文字・小文字を区別せずに商品名で検索できるように
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <main>
        <div className="button-area completion-button-area">
          <ActionButton
            label="戻す"
            className="back-button"
            onClick={handleBack}
          />
          <ActionButton
            label="削除"
            className="delete-button"
            onClick={handleDelete}
          />
        </div>

        <ItemList
          title="購入済リスト"
          items={filteredItems}
          checkedIds={checkedIds}
          setCheckedIds={setCheckedIds}
          SortComponent={
            <AddItemSort items={items} onSortedItemsChange={setSortedItems} />
          }
        />
      </main>
    </>
  );
};
export default CompletionPage;
