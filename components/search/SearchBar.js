import { useEffect, useState } from 'react';
import SearchIcon from '../svgs/SearchIcon';
import styles from './SearchBar.module.css';

const SearchBar = ({
  handleEmptyInput,
  handleSearch,
  placeholder = 'Search',
}) => {
  const [text, setText] = useState('');
  const handleChange = (e) => {
    setText(e.target.value);
    if (e.target.value == '') {
      handleEmptyInput();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(text);
    }
  };
  return (
    <div className={styles['searchbar-container']}>
      <input
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles['searchbar-input']}
      ></input>
      <button
        type='button'
        onClick={() => handleSearch(text)}
        className={styles['searchbar-btn']}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
