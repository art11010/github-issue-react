import styles from './ListContainer.module.css';
import { useState } from 'react';
import ListItemLayout from './ListItemLayout';
import ListItem from './ListItem';
import Button from './Button';
import cx from 'clsx';

export default function ListContainer() {
  const [inputValue, setInputValue] = useState('is:pr is:open');

  return (
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
        <div className={styles.filterLists}>
          <span>Author</span>
          <span>Label</span>
          <span>Projects</span>
          <span>Milestones</span>
          <span>Assignee</span>
          <span>Sort</span>
        </div>
      </ListItemLayout>
      <div className={styles.container}>
        <ListItem
          badges={[
            {
              color: 'f00',
              name: 'Issue 1',
            },
          ]}
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
