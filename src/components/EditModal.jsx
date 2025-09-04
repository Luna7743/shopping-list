import { useState } from 'react';

function EditModal({ item, onClose, onUpdate }) {
  const [name, setName] = useState(item.name);
  const [count, setCount] = useState(item.count);
  // 日本語入力の変換中かどうか（IMEの対応に使う）
  const [isComposing, setIsComposing] = useState(false);

  // フォーム送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    //更新された値を親に渡す
    onUpdate({ ...item, name, count: count || 1 });
    //モーダルを閉じる
    onClose();
  };

  //キーボードのEnterを押したとき
  const handleKeyDown = (e) => {
    // IME中はEnterでも検索しない
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault(); // フォームのデフォルト送信防止（必要に応じて）
      handleSubmit(e);
    }
  };

  return (
    <div className="madal-backdrop">
      <div className="modal">
        <h2>編集</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>商品名</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
          </div>

          <div>
            <label>個数</label>
            <input
              type="number"
              value={count || ''} // 0なら空に表示
              onChange={(e) => setCount(Number(e.target.value))}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="modal-actions">
            <button className="cancel" type="button" onClick={onClose}>
              キャンセル
            </button>
            <button className="update" type="submit">
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
