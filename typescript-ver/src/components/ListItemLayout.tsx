import styles from './ListItemLayout.module.css'
import cx from 'clsx'

interface ListItemLayoutProps {
  checked?: boolean
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
  className?: string
}
export default function ListItemLayout (
  { checked, onClick, children, className }: ListItemLayoutProps
) {
  return (
    <div className={cx(styles.wrapper, className)}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={onClick}
      />
      {children}
    </div>
  )
}
