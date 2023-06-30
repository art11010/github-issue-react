import styles from './ListContainer.module.css';
import { useState } from 'react';
import ListItemLayout from './ListItemLayout';
import ListItem from './ListItem';
import Button from './Button';
import cx from 'clsx';
import Modal from './Modal';
import Pagination from './Pagination';

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
          <Button
            style={{
              fontSize: '1.4rem',
              backgroundColor: 'green',
              color: 'white',
            }}
          >
            New lssue
          </Button>
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
      <Pagination
        maxPage={10}
        currentPage={page}
        onClickPageButton={(number) => setPage(number)}
      />
    </>
  );
}

function ListFilter({ onChangeFilter }) {
  return (
    <>
      <div className={styles.filterLists}>
        <ListFilterItem>Author</ListFilterItem>
        <ListFilterItem>Label</ListFilterItem>
        <ListFilterItem>Projects</ListFilterItem>
        <ListFilterItem>Milestones</ListFilterItem>
        <ListFilterItem>Assignee</ListFilterItem>
        <ListFilterItem>Sort</ListFilterItem>
      </div>
    </>
  );
}

function ListFilterItem({ onClick, children, onChangeFilter }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={() => setShowModal(true)}>
        {children} ▾
      </span>
      <div className={styles.modalContainer}>
        <Modal
          opened={showModal}
          onClose={() => setShowModal(false)}
          placeholder="여기다!"
          searchDataList={['bug', 'Labels', 'milestone', 'author', 'hmmini']}
          onClickCell={() => {
            // 클린 된 정보를 통해 list 필터링
            onChangeFilter();
          }}
        />
      </div>
    </div>
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
