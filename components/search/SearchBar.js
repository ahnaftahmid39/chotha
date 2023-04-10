import SearchIcon from '../svgs/SearchIcon';
import styles from './SearchBar.module.css'


const SearchBar = () => {
  return (
    <div className={styles['searchbar-container']}>
      <input className={styles['searchbar-input']}></input>
      <button className={styles['searchbar-btn']}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
