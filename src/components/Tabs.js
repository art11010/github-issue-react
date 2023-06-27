import { useState } from 'react';
import styles from './Tabs.module.css';
import cx from 'clsx';

const tabList = ['Code', 'Issues', 'Pull Requests'];
export default function Tabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <ul className={styles.tabList}>
      {tabList.map((tab, idx) => (
        <Tab
          key={idx}
          title={tab}
          number="0"
          selected={selectedTabIndex === idx}
          onClick={() => setSelectedTabIndex(idx)}
        />
      ))}
    </ul>
  );
}

function Tab({ title, selected, onClick, number }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={cx(styles.tab, { [styles.selected]: selected })}
      >
        <span>{title}</span>
        {number && <span className={styles.circle}>{number}</span>}
      </button>
    </li>
  );
}
