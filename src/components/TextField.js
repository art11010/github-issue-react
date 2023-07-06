import cx from 'clsx';

import styles from './TextField.module.css';
import { forwardRef } from 'react';

export default forwardRef(function TextField(
  { type = 'input', name, placeholder, value, onChange, error },
  ref,
) {
  return type === 'input' ? (
    <input
      name={name}
      ref={ref}
      className={cx(styles.input, styles.border, { [styles.error]: error })}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ) : (
    <textarea
      name={name}
      ref={ref}
      className={cx(styles.input, styles.textarea, styles.border, {
        [styles.error]: error,
      })}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></textarea>
  );
});

// export default forwardRef(TextField);
