import { useEffect, useState } from 'react';
import axios from 'axios';
import { GITHUB_API } from '../api/api';
import { useQuery } from 'react-query';

// useForm
export function useForm({
  initialValues,
  validate,
  refs,
  onSuccess, // 성공했을 때
  onErrors, // 에러났을때
  onSubmit, // 값이 전달 됐을 때 함수 or 네트워크 호출
}) {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const vaildateResulte = validate(inputValues);
    setErrors(vaildateResulte);

    const errorKeys = Object.keys(vaildateResulte);
    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      alert(vaildateResulte[key]);
      // onErrors();
      refs[key].current.focus();

      setIsSubmitting(false);
      return;
    } else {
      try {
        const result = await onSubmit();
        onSuccess(result);
      } catch (e) {
        console.log({ e });
        onErrors();
      }

      return;
    }
  }

  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit,
  };
}

// useUser
async function getUserInfo() {
  const { data } = await axios.get(`${GITHUB_API}/user`, {
    headers: {
      Authorization: process.env.REACT_APP_GITHUB_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  return data;
}
export function useUser() {
  // 1. user 정보는 매본 바뀌지 않음
  // 2. 그럼에도, useUser를 호출 할 때마다 네트워크 통신이 발생한다
  // => 캐싱(임시적으로 데이터 저장) 필요, react query를 사용하는 이유
  // useQuery(queryKey, queryFn)
  // queryKey : 어떤 데이터인지 알려주는 식별자
  // queryFn : queryKey를 return 받는 함수
  return useQuery(['userInfo'], getUserInfo, { staleTime: 'Infinity' });
  // 쿼리 인스턴스가 mount 후 useUser() 실행하여 userInfo라는 쿼리 키로 캐싱
  // -> fetch(신선한 상태) -> stale(신선하지않은 상태) -> 인스턴스 unmount
  // staleTime: 'Infinity' => 항상 fetch(신선한 상태)로 인지하여 불필요한 네트워크 콜을 방지함
}

// useFilteredData
export function useFilteredData(searchDataList) {
  const [filteredData, setFilteredData] = useState(searchDataList);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setFilteredData(searchDataList);
  }, [searchDataList]);

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(searchDataList);
    } else {
      const filteredSearchList = searchDataList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredData(filteredSearchList);
    }
  }, [searchDataList, searchValue]);

  return { filteredData, searchValue, setSearchValue };
}
