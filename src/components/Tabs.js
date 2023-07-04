import { useState } from 'react';
import styles from './Tabs.module.css';
import cx from 'clsx';

const TabList = [
  { name: 'Code', pathname: '/code' },
  { name: 'Issues', pathname: '/issue' },
  { name: 'Pull Request', pathname: '/pulls' },
  { name: 'Actions', pathname: '/actions' },
  { name: 'Projects', pathname: '/projects' },
  { name: 'Security', pathname: '/security' },
];

export default function Tabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);
  return (
    <ul className={styles.tabList}>
      {TabList.map((tab, idx) => (
        <Tab
          key={tab.name}
          title={tab.name}
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
