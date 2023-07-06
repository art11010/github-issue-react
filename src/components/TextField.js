import cx from 'clsx';

import styles from './TextField.module.css';
import { forwardRef } from 'react';

export default forwardRef(function TextField(
  { type = 'input', name, placeholder },
  ref,
) {
  return type === 'input' ? (
    <input
      name={name}
      type="text"
      className={cx(styles.input, styles.border)}
      placeholder={placeholder}
    />
  ) : (
    <textarea
      name={name}
      className={cx(styles.input, styles.textarea, styles.border)}
      placeholder={placeholder}
    ></textarea>
  );
});

// export default forwardRef(TextField);
