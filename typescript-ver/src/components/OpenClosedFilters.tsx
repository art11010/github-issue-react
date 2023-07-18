import cx from 'clsx'
import styles from './OpenClosedFilters.module.css'

interface FiltersProps {
  isOpenState: boolean
  onClickState: (v: string) => void
}

export default function OpenClosedFilters (
  { isOpenState, onClickState }: FiltersProps
) {
  return (
    <>
      <OpenClosedFilter
        state="Open"
        selected={isOpenState}
        onClick={() => { onClickState('open') }}
      />
      <OpenClosedFilter
        state="Closed"
        selected={!isOpenState}
        onClick={() => { onClickState('closed') }}
      />
    </>
  )
}

interface FilterProps {
  state: string
  selected: boolean
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
}

function OpenClosedFilter (
  { state, onClick, selected }: FilterProps
) {
  return (
    <span
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
      role="button"
    >
      {state}
    </span>
  )
}
