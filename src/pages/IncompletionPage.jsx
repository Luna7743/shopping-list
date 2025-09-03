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
  const [checkedIds, setCheckedIds] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedItems, setSortedItems] = useState([]);

  // Firestore リアルタイム取得
  useEffect(() => {
    //ログアウト状態のときに Firestore にアクセスしないように
    if (!user) return;

    //Firestore の参照を作る
    const itemRef = collection(db, 'users', user.uid, 'items');
    //onSnapshot でリアルタイム監視
    const unsub = onSnapshot(itemRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data.filter((item) => !item.completed)); //未購入のみ
    });
    return () => unsub();
  }, [user]);

  //アイテムを追加
  const handleAddItem = async (item) => {
    //ログアウト状態のときに Firestore にアクセスしないように
    if (!user) return;

    //Firestore の参照を作る
    const itemsRef = collection(db, 'users', user.uid, 'items');

    // 新しいドキュメントを追加
    await addDoc(itemsRef, {
      ...item,
      completed: false,
      createdAt: serverTimestamp(),
    });
  };

  // 各ボタンの処理
  //購入済みにする
  const handleComplete = async () => {
    for (const id of checkedIds) {
      //Firestore の参照を作る
      const docRef = doc(db, 'users', user.uid, 'items', id);
      //updateDoc でフィールドを更新
      await updateDoc(docRef, { completed: true });
    }
    //チェック状態をリセット
    setCheckedIds([]);
  };

  //削除
  const handleDelete = async () => {
    for (const id of checkedIds) {
      const docRef = doc(db, 'users', user.uid, 'items', id);
      await deleteDoc(docRef);
    }
    setCheckedIds([]);
  };

  //編集
  const handleUpdate = async (updated) => {
    const docRef = doc(db, 'users', user.uid, 'items', updated.id);
    await updateDoc(docRef, { ...updated });
    //編集用モーダルを閉じる
    setEditingItem(null);
    setCheckedIds([]);
  };

  //検索適用
  const filteredItems =
    //ソート済みリストがある場合はそれを優先、なければ元の items リストを使用
    (sortedItems.length > 0 ? sortedItems : items)
      .filter(
      //大文字・小文字を区別せずに商品名で検索できるように
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <main>
        <AddItemForm onAdd={handleAddItem} />

        <div className="button-area">
          <ActionButton label="購入" onClick={handleComplete} />
          <ActionButton label="削除" onClick={handleDelete} />
          {checkedIds.length === 1 && (
            <ActionButton
              label="編集"
              onClick={() => {
                const target = items.find((item) => item.id === checkedIds[0]);
                setEditingItem(target);
              }}
            />
          )}
        </div>

        <ItemList
          title="未購入リスト"
          items={filteredItems}
          checkedIds={checkedIds}
          setCheckedIds={setCheckedIds}
          SortComponent={
            <AddItemSort items={items} onSortedItemsChange={setSortedItems} />
          }
        />
      </main>

      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default IncompletionPage;
