import styles from './App.module.css';
import Header from './Header';
import ListContainer from './components/ListContainer';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className={styles.nav}>Nav</div>

      <Header />
      <ListContainer />
      <Footer />
    </>
  );
}

export default App;
