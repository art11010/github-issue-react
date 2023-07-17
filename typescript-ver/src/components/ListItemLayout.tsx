import styles from './ListItemLayout.module.css'
import cx from 'clsx'

interface ListItemLayoutProps {
  children: React.ReactNode
  className?: string
}
export default function ListItemLayout (
  { children, className }: ListItemLayoutProps
) {
  return (
    <div className={cx(styles.wrapper, className)}>
      <input
        type="checkbox"
        className={styles.checkbox}
        // value={checked}
        // onChange={onChangeCheckbox}
      />
      {children}
    </div>
  )
}
