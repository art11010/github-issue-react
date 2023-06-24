import styles from './App.module.css';
import Button from './components/Button';
import Header from './Header';

function App() {
  return (
    <>
      <div className={styles.nav}>Nav</div>

      <Header />
      <div className={styles.listContainer}>
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
      <div className={styles.footer}>footer</div>
    </>
  );
}

export default App;
