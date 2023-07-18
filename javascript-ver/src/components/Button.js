import styles from './Button.module.css';
import cx from 'clsx';

export default function Button({
  header,
  green,
  children,
  type = 'button',
  disabled,
}) {
  return (
    <button
      type={type}
      className={cx(styles.button, {
        [styles.green]: green,
        [styles.header]: header,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
