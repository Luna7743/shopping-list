// 新しい購入品を追加するフォーム
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { LuMinus } from 'react-icons/lu';

const AddItemForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);

  const handleSubmit = (e) => {
    //フォームのデフォルトの送信（ページリロード）を防ぐ。
    e.preventDefault();
    //空白だけの入力は無視する。
    if (!name.trim()) return;

    // 新しいアイテムを作成
    const newItem = {
      name,
      count,
      completed: false, //未購入状態
    };

    // 親(App.jsx)から渡された関数を呼ぶ。これで親のstateが更新される
    onAdd(newItem);
    // フォームの初期化など
    setName('');
    setCount(1);
  };

  return (
    <form className="list-add" onSubmit={handleSubmit}>
      {/* 商品名入力 */}
      <div className="input-add-area">
        <input
          type="text"
          placeholder="新規購入品名"
          className="input-add"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="count">
        {/* 個数入力と増減ボタン */}
        <input
          type="number"
          value={count}
          min="1"
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button
          type="button"
          onClick={() => setCount((c) => Math.max(1, c - 1))}
        >
          <LuMinus />
        </button>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          <GoPlus />
        </button>
        {/* 追加ボタン */}
        <button type="submit" className="add-btn">
          追加
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
