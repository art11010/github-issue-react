import { useLocation, Link } from 'react-router-dom';
import cx from 'clsx';
import styles from './Tabs.module.css';

const TabList = [
  { name: 'Code', pathname: '/code' },
  { name: 'Issues', pathname: '/issue' },
  { name: 'Pull Request', pathname: '/pulls' },
  { name: 'Actions', pathname: '/actions' },
  { name: 'Projects', pathname: '/projects' },
  { name: 'Security', pathname: '/security' },
];

export default function Tabs() {
  const { pathname } = useLocation();

  return (
    <ul className={styles.tabList}>
      {TabList.map((tab, idx) => (
        <Tab
          key={tab.name}
          item={tab}
          selected={(pathname === '/' ? '/issue' : pathname) === tab.pathname}
        />
      ))}
    </ul>
  );
}

function Tab({ item, selected, number }) {
  return (
    <li>
      <Link
        to={item.pathname}
        className={cx(styles.tab, { [styles.selected]: selected })}
      >
        <span>{item.name}</span>
        {number && <span className={styles.circle}>{number}</span>}
      </Link>
    </li>
  );
}
