// 購入共通ページ
import { useState, useEffect } from 'react';
import '../App.scss';

function ItemPage({
  user, //保存先
  showAddForm=true, //追加フォームを表示するか
  showEdit, //編集ボタンを表示するか
  filterFn, //表示するアイテムの条件
  extraButtons, //ページ固有のボタン
  ListComponent, //表示に使うリストUI
}) {
  // 商品の一覧（{id, name, count, createdAt, completed}）の配列
  const [items, setItmes] = useState([]);
  // チェックボックスで選択されたアイテムIDの配列;
  const [checkedIds, setCheckedIds] = useState([]);

  return <div></div>;
}






export default ItemPage;
