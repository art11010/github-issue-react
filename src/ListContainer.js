import { useEffect, useState } from 'react';

import ListItemLayout from './components/ListItemLayout';
import ListItem from './components/ListItem';
import ListFilter from './components/ListFilter';
import OpenClosedFilters from './components/OpenClosedFilters';
import Button from './components/Button';
import Pagination from './components/Pagination';
import { GITHUB_API } from './api/api';

import axios from 'axios';
import styles from './ListContainer.module.css';

export default function ListContainer() {
  const [inputValue, setInputValue] = useState('is:pr is:open');
  const [checked, setChecked] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpenMode, setIsOpenMode] = useState(true);
  const [params, setParams] = useState();
  const maxPage = 10;

  async function getData(params) {
    const { data } = await axios.get(
      `${GITHUB_API}/repos/facebook/react/issues`,
      {
        params,
      },
    );
    setList(data);
  }
  useEffect(() => {
    getData({ page, state: isOpenMode ? 'open' : 'closed', ...params });
  }, [page, isOpenMode, params]);

  // const MAX_PAGE = getData().totalCount
  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button green>New lssue</Button>
        </div>
        <OpenClosedFilters
          isOpenMode={isOpenMode}
          onClickMode={setIsOpenMode}
        />
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter
              onChangeFilter={(params) => {
                // 필터링 된 요소에 맞게 데이터 불러오기
                // const data = getData();
                setParams(params);
              }}
            />
          </ListItemLayout>
          {list.map((item) => (
            <ListItem
              key={item.id}
              data={item}
              checked={checked}
              onClickCheckbox={() => setChecked(!checked)}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          maxPage={maxPage}
          currentPage={page}
          onClickPageButton={(number) => setPage(number)}
        />
      </div>
    </>
  );
}
