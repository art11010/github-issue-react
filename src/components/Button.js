import styles from './Button.module.css';
import cx from 'clsx';

export default function Button({ header, green, children, type = 'button' }) {
  return (
    <button
      type={type}
      className={cx(styles.button, {
        [styles.green]: green,
        [styles.header]: header,
      })}
    >
      {children}
    </button>
  );
}
