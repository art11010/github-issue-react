import styles from './ListContainer.module.css';
import { useState } from 'react';
import ListItemLayout from './ListItemLayout';
import ListItem from './ListItem';
import Button from './Button';
import cx from 'clsx';

import Pagination from './Pagination';
import ListFilter from './ListFilter';

export default function ListContainer() {
  const [inputValue, setInputValue] = useState('is:pr is:open');
  const [list, setList] = useState([] /* data */);
  const [page, setPage] = useState(1);

  // const MAX_PAGE = getData().totalCount
  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button green>New lssue</Button>
        </div>

        <OpenClosedFilters />

        <ListItemLayout className={styles.listFilter}>
          <ListFilter
            onChangeFilter={(filteredDate) => {
              // 필터링 된 요소에 맞게 데이터 불러오기
              // const data = getData();
              // setList(data)
            }}
          />
        </ListItemLayout>
        <div className={styles.container}>
          {list.map((listItem, index) => (
            <ListItem
              key={index}
              badges={[
                {
                  color: 'f00',
                  name: 'Issue 1',
                },
              ]}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          maxPage={10}
          currentPage={page}
          onClickPageButton={(number) => setPage(number)}
        />
      </div>
    </>
  );
}

function OpenClosedFilters({ data }) {
  const [isOpenMode, setIsOpenMode] = useState(true);

  // const data = getData();
  // const openData = data.filter((d) => d.state === 'open');
  // const closedData = data.filter((d) => d.state === 'closed');

  const openModeDataSize = 1;
  const closeModeDataSize = 2;

  return (
    <>
      <OpenClosedFilter
        size={openModeDataSize}
        state="Open"
        selected={isOpenMode}
        onClick={() => setIsOpenMode(true)}
      />
      <OpenClosedFilter
        size={closeModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        onClick={() => setIsOpenMode(false)}
      />
    </>
  );
}

function OpenClosedFilter({ size, state, onClick, selected }) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {size} {state}
    </span>
  );
}
