import styles from './Button.module.css';
import cx from 'clsx';

export default function Button({ header, green, children }) {
  return (
    <button
      className={cx(styles.button, {
        [styles.green]: green,
        [styles.header]: header,
      })}
    >
      {children}
    </button>
  );
}
