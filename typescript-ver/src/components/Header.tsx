import styles from './Header.module.css'
// import Button from './Button';
// import Space from './Space';
// import Tabs from './Tabs';

export default function Header () {
  return (
    <div className={styles.header}>
      <div className={styles.topSection}>
        <h2 className={styles.name}>
          yezi / <span className={styles.bold}>github-issue-react</span>
        </h2>
        <div className={styles.buttonContainer}>
          {/* <Button header>Watch</Button>
          <Space />
          <Button header>
            Fork <div className={styles.circle}>5</div>
          </Button>
          <Space />
          <Button header>Star</Button> */}
        </div>
      </div>
      {/* <Tabs /> */}
    </div>
  )
}
