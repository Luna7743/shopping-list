import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';
import { PiShoppingCartFill } from 'react-icons/pi';
import { PiShoppingCartLight } from 'react-icons/pi';

const Header = ({ onSearch }) => {
  //入力中の検索文字列を保持
  const [searchTerm, setSearchTerm] = useState('');
  // 日本語入力の変換中かどうか（IMEの対応に使う）
  const [isComposing, setIsComposing] = useState(false);
  // 🔹 検索バーのref
  const searchRef = useRef(null);
  // ここで現在のURLを取得
  const location = useLocation();
  //スマホ用検索バー
  const [showSearchBar, setShowSearchBar] = useState(false);

  // 外側クリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchBar(false);
      }
    };

    if (showSearchBar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchBar]);

  //検索ボタンを押したとき
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    // 検索実行後はモバイル用バーを閉じる
    setShowSearchBar(false);
  };

  //キーボードのEnterを押したとき
  const handleKeyDown = (e) => {
    // IME中はEnterでも検索しない
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault(); // フォームのデフォルト送信防止（必要に応じて）
      onSearch(searchTerm);
      // 検索バー閉じる（スマホ用）
      setShowSearchBar(false);
    }
  };

  //
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header>
      <div
        className={`header-list ${
          location.pathname === '/purchased'
            ? 'header-purchased'
            : 'header-unpurchased'
        }`}
      >
        <h1>お買い物リスト</h1>
        {/* PC/タブレット用の検索バー */}
        <div className="search-area">
          <input
            type="text"
            placeholder="検索商品名を入力してください"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <button className="search-btn" onClick={handleSearchClick}>
            <AiOutlineSearch />
          </button>
        </div>

        <div className="link-area">
          {/* スマホ用の検索アイコン */}
          <button className="search-btn-mobile" onClick={toggleSearchBar}>
            <AiOutlineSearch />
          </button>

          <nav>
            {location.pathname === '/unpurchased' ? (
              <Link to="/purchased">
                <PiShoppingCartFill className="purchased-icon" />
                購入済一覧へ
              </Link>
            ) : (
              <Link to="/unpurchased">
                <PiShoppingCartLight className="unpurchased-icon" />
                未購入一覧へ
              </Link>
            )}
          </nav>
        </div>
        <Logout />
      </div>
      {/* スマホ用 アイコン押したら出る検索バー */}
      {showSearchBar && (
        <div className="dropdown-search" ref={searchRef}>
          <input
            type="text"
            placeholder="検索商品名を入力してください"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <button className="search-btn" onClick={handleSearchClick}>
            <AiOutlineSearch />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
