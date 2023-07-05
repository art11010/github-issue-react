import cx from 'clsx';
import React from 'react';

import styles from './OpenClosedFilters.module.css';

export default function OpenClosedFilters({ isOpenState, onClickState }) {
  return (
    <>
      <OpenClosedFilter
        state="Open"
        selected={isOpenState}
        onClick={() => onClickState('open')}
      />
      <OpenClosedFilter
        state="Closed"
        selected={!isOpenState}
        onClick={() => onClickState('closed')}
      />
    </>
  );
}

function OpenClosedFilter({ state, onClick, selected }) {
  return (
    <span
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
      role="button"
    >
      {state}
    </span>
  );
}
