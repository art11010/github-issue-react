import styles from './Button.module.css'
import cx from 'clsx'

interface ButtonProps {
  header?: boolean
  green?: boolean
  children: React.ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button ({
  header,
  green,
  children,
  type = 'button',
  disabled
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(styles.button, {
        [styles.green]: green,
        [styles.header]: header
      })}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
