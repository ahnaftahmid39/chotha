import { memo, useEffect } from 'react';
import { useState } from 'react';

import styles from './Filter.module.css';
import iconStyles from './Icons.module.css';

const DropDownIcon = memo(() => {
  return (
    <svg
      className={iconStyles['icon']}
      width='12'
      height='7'
      viewBox='0 0 12 7'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 1L6 6L11 1' stroke='#31549B' />
    </svg>
  );
});

DropDownIcon.displayName = 'DropDownIcon';

const CloseDropDownIcon = memo(() => {
  return (
    <svg
      className={iconStyles['icon']}
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 1L6 6M6 6L11 1M6 6L1.00001 11M6 6L11 11' stroke='#31549B' />
    </svg>
  );
});

CloseDropDownIcon.displayName = 'CloseDropDownIcon';

const SORT_BY = [
  {
    label: 'Date Created',
    value: 'createdAt',
  },
  {
    label: 'Search Relevance',
    value: 'relevance',
  },
  {
    label: 'Author',
    value: 'author',
  },
];

const ORDER = [
  {
    label: 'Ascending',
    value: 'asc',
  },
  {
    label: 'Descending',
    value: 'desc',
  },
];

const DropDownMenu = ({
  handleSelect = (idx) => {},
  options = [{ label: '', value: '' }],
  ...props
}) => {
  return (
    <div className={styles['dropdown']} {...props}>
      {options.map(({ label }, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              handleSelect(idx);
            }}
            className={styles['items']}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

const Filter = ({ handleFilter, updateFilter, ...props }) => {
  const [sortBy, setSortBy] = useState(SORT_BY[0]);
  const [order, setOrder] = useState(ORDER[1]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    handleFilter({ sortBy: sortBy.value, order: order.value, skip, limit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, order, skip, limit]);

  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <div className={styles['wrapper']} {...props}>
      <div className={styles['sortby-wrapper']}>
        <span className={styles['heading']}>Sort By: </span>
        <div
          onClick={() => {
            setIsSortByOpen(!isSortByOpen);
          }}
          className={styles['label-btn-wrapper']}
        >
          <span className={styles['label']}>{sortBy.label}</span>

          {isSortByOpen && (
            <>
              <DropDownMenu
                options={SORT_BY}
                handleSelect={(idx) => {
                  setSortBy(SORT_BY[idx]);
                  setIsSortByOpen(false);
                }}
              />
              <div className={styles['click-outside']}></div>
            </>
          )}
          {isSortByOpen ? <CloseDropDownIcon /> : <DropDownIcon />}
        </div>
      </div>

      <div className={styles['order-wrapper']}>
        <span className={styles['heading']}>Order : </span>

        <div
          onClick={() => {
            setIsOrderOpen(!isOrderOpen);
          }}
          className={styles['label-btn-wrapper']}
        >
          <span className={styles['label']}>{order.label}</span>

          {isOrderOpen && (
            <>
              <DropDownMenu
                options={ORDER}
                handleSelect={(idx) => {
                  setOrder(ORDER[idx]);
                  setIsOrderOpen(false);
                }}
              />
              <div className={styles['click-outside']}></div>
            </>
          )}
          {isOrderOpen ? <CloseDropDownIcon /> : <DropDownIcon />}
        </div>
      </div>
      <div className={styles['skip-wrapper']}>
        <label htmlFor='skip' className={styles['heading']}>
          Skip
        </label>
        <input
          id='skip'
          min={0}
          type='number'
          value={skip}
          onChange={(e) => setSkip(e.target.value)}
        ></input>
      </div>
      <div className={styles['limit-wrapper']}>
        <label htmlFor='limit' className={styles['heading']}>
          Limit
        </label>
        <input
          min={0}
          id='limit'
          type='number'
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        ></input>
      </div>
      {/* <Button
        style={{ padding: '0.3rem 0.7rem' }}
        onClick={() =>
          handleFilter({
            sortBy: sortBy.value,
            order: order.value,
            skip,
            limit,
          })
        }
        buttonType='outlined'
      >
        Filter
      </Button> */}
    </div>
  );
};

export default Filter;
