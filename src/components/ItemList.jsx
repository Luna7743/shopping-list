// 購入共通ページ:リスト部分
import React from 'react';

const ItemList = ({ title, items, checkedIds, setCheckedIds, SortComponent, }) => {
  const handleCheck = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="item-area">
      <div className="list-header">
        <h2>{title}</h2>
        {SortComponent && <div className="sort-area">{SortComponent}</div>}
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div className="list-row">
              <input
                type="checkbox"
                checked={checkedIds.includes(item.id)}
                onChange={() => handleCheck(item.id)}
              />
              <div className="list-tag">
                <p className="list-item">{item.name}</p>
                <div className="item-part">
                  <span>個数: {item.count}</span>
                  <span>作成日: {item.createdAt}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}





export default ItemList;
