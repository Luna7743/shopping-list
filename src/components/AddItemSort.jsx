// アイテムリストの並び順を切り替える
import { useState, useEffect } from 'react';

const AddItemSort = ({ items, onSortedItemsChange }) => {
  //現在選択されているソート方法を保持
  const [sortOption, setSortOption] = useState('1');

  useEffect(() => {
    // ソート処理を一括管理
    const sorted = [...items].sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);

      if (sortOption === '1') {
        return dateA - dateB;
      } else if (sortOption === '2') {
        return dateB - dateA;
      } else if (sortOption === '3') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === '4') {
        return b.name.localeCompare(a.name);
      } else if (sortOption === '5') {
        return a.count - b.count;
      } else if (sortOption === '6') {
        return b.count - a.count;
      }
      return 0;
    });

    // 親にソート済み配列を渡す
    onSortedItemsChange?.(sorted);
  }, [items, sortOption, onSortedItemsChange]);

  //ソートの切り替え
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
  };

  return (
      <div className="sort-content">
        <span>表示順</span>
        <select
          name="orderby"
          className="order-by"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="1">作成日（古）</option>
          <option value="2">作成日（新）</option>
          <option value="3">名前（A→Z）</option>
          <option value="4">名前（Z→A）</option>
          <option value="5">個数少ない</option>
          <option value="6">個数多い</option>
        </select>
      </div>

  );
};

export default AddItemSort;
