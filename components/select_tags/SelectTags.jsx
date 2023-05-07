import { useEffect, useMemo, useRef, useState } from 'react';

import ls from '../../lib/ls';
import styles from './SelectTags.module.css';

function isSubSequence(str1, str2, m, n) {
  if (m == 0) return true;
  if (n == 0) return false;
  if (str1[m - 1] == str2[n - 1])
    return isSubSequence(str1, str2, m - 1, n - 1);
  return isSubSequence(str1, str2, m, n - 1);
}

const SelectTag = ({ onChange }) => {
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleAddTag = async (newTag) => {
    if (newTag != '') {
      try {
        const res = await fetch('/api/trivial/tags', {
          method: 'POST',
          body: JSON.stringify({ tagName: newTag }),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ls.getToken()}`,
          },
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setSelected([...selected, newTag]);
          setTags([...tags, newTag]);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    onChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('/api/trivial/tags', { method: 'GET' });
        const data = await res.json();
        if (res.ok) setTags(data.tags.map(({ tagName }) => tagName));
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchTags();
  }, []);

  const searchBarRef = useRef();

  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) searchBarRef.current?.focus();
  }, [isMenuOpen]);

  const candidates = useMemo(() => {
    if (search == '') return tags.filter((tag) => !selected.includes(tag));
    else {
      return tags.filter((tag) => {
        return (
          !selected.includes(tag) &&
          isSubSequence(search, tag, search.length, tag.length)
        );
      });
    }
  }, [search, tags, selected]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target != searchBarRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          e.preventDefault();

          if (isMenuOpen && candidates.length > 0)
            handleSelect(candidates[highlightedIndex]);
          break;
        case 'ArrowUp':
        case 'ArrowDown': {
          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < candidates.length) {
            setHighlightedIndex(newValue);
            return;
          }
          break;
        }
        case 'Escape':
          setIsMenuOpen(false);
          break;
      }
    };
    searchBarRef.current?.addEventListener('keydown', handler);
    const ref = searchBarRef;
    return () => {
      ref.current?.removeEventListener('keydown', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen, highlightedIndex, candidates]);

  const handleSelect = (tag) => {
    if (selected.includes(tag)) return;
    setSelected([...selected, tag]);
    if (search != '') setSearch('');
  };

  const handleUnSelect = (tag) => {
    setSelected((selected) => selected.filter((stag) => stag != tag));
  };

  const handleUnSelectAll = () => {
    setSelected([]);
  };

  return (
    <div
      tabIndex={0}
      // onFocus={() => {
      //   setIsMenuOpen(true);
      // }}
      onClick={({ currentTarget, relatedTarget }) => {
        if (currentTarget.contains(relatedTarget)) return;
        setIsMenuOpen(!isMenuOpen);
      }}
      onBlur={({ currentTarget, relatedTarget }) => {
        if (currentTarget.contains(relatedTarget)) return;
        setIsMenuOpen(false);
        setHighlightedIndex(0);
      }}
      className={styles['wrapper']}
    >
      <div className={styles['selected-tags']}>
        {selected.length > 0 ? (
          selected.map((tag) => {
            return (
              <div
                onClick={() => {
                  handleUnSelect(tag);
                }}
                className={styles['selected-tag']}
                key={tag}
              >
                {tag}
              </div>
            );
          })
        ) : (
          <div className={styles['select-heading']}>Select tags</div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleUnSelectAll();
        }}
        className={styles['clear-btn']}
      >
        &times;
      </button>
      <div className={styles['divider']}></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className={styles['caret']}
      ></div>

      <div aria-hidden={!isMenuOpen} className={styles['menu']}>
        <input
          ref={searchBarRef}
          value={search}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder='Search Tags or Add your own'
        />
        <ul>
          {search != '' &&
          !candidates.includes(search) &&
          !selected.includes(search) ? (
            <li
              // aria-current={highlightedIndex == -1}
              onClick={(e) => {
                handleAddTag(search);
              }}
              className={styles['create-new']}
            >
              Create new tag {`"${search}"`}
            </li>
          ) : null}
          {selected.includes(search) && <li>Already added {`"${search}"`}</li>}
          {candidates.length > 0
            ? candidates.map((candy, index) => {
                return (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(candy);
                    }}
                    aria-current={highlightedIndex == index}
                    onMouseEnter={() => {
                      if (highlightedIndex != index) {
                        setHighlightedIndex(index);
                      }
                    }}
                    className={styles['candidate-tag']}
                    key={candy}
                  >
                    {candy}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default SelectTag;
