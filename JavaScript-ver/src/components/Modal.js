import cx from 'clsx';
import styles from './Modal.module.css';
import { useFilteredData } from '../hooks/hooks';

export default function Modal({
  opened,
  title,
  onClose,
  placeholder,
  searchDataList,
  onClickCell,
}) {
  const { filteredData, searchValue, setSearchValue } =
    useFilteredData(searchDataList);

  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header}>
        <span>Filter by {title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className={styles.input}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {filteredData.map((data) => {
          return (
            <div
              key={data.name}
              onClick={() => {
                const isLabel = title.toLowerCase() === 'label';
                const paramKey = isLabel ? 'labels' : title.toLowerCase();

                onClickCell({ [paramKey]: data.name });
              }}
              role="button"
              className={styles.item}
            >
              {data.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
