import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

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

  const maxPage = 10;

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.toString());
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const state = searchParams.get('state');

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
    getData(searchParams);
  }, [searchParams]);

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
          <Link to="/new" className={styles.link}>
            <Button green>New lssue</Button>
          </Link>
        </div>
        <OpenClosedFilters
          isOpenState={state !== 'closed'}
          onClickState={(state) => setSearchParams({ state })}
        />
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter
              onChangeFilter={(params) => {
                // 필터링 된 요소에 맞게 데이터 불러오기
                // const data = getData();
                setSearchParams(params);
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
          onClickPageButton={(pageNumber) =>
            setSearchParams({ page: pageNumber })
          }
        />
      </div>
    </>
  );
}
