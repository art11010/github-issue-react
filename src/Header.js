import styles from './Header.module.css';
import Button from './components/Button';
import Space from './components/Space';
import Tabs from './components/Tabs';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.buttonContainer}>
        <Button style={{ fontSize: '1.4rem', backgroundColor: 'transparent' }}>
          Watch
        </Button>
        <Space />
        <Button style={{ fontSize: '1.4rem', backgroundColor: 'transparent' }}>
          Fork <div className={styles.circle}>5</div>
        </Button>
        <Space />
        <Button style={{ fontSize: '1.4rem', backgroundColor: 'transparent' }}>
          Star
        </Button>
      </div>

      <Tabs />
    </div>
  );
}
