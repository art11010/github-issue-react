import styles from './Header.module.css';
import Button from './components/Button';
import Space from './components/Space';

export default function Header() {
  return (
    <div className={styles.header}>
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
  );
}
