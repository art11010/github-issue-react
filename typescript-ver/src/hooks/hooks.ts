import { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import { GITHUB_API } from '../api/api'
import { type List } from '../models/issues'

// useForm
interface useFormProps {
  initialValues: Record<string, string>
  validate: (values: Record<string, string>) => Record<string, string>
  refs: Record<string, React.MutableRefObject<HTMLInputElement>>
  onSuccess: (result: string) => void
  onErrors: () => void
  onSubmit: () => Promise<string>
}

export function useForm ({
  initialValues,
  validate,
  refs,
  onSuccess, // 성공했을 때
  onErrors, // 에러났을때
  onSubmit // 값이 전달 됐을 때 함수 or 네트워크 호출
}: useFormProps) {
  const [inputValues, setInputValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function onChange (e: React.ChangeEvent<{ name: string, value: string }>) {
    const { name, value } = e.target
    setInputValues({ ...inputValues, [name]: value })
  }

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    const validateResulte = validate(inputValues)
    setErrors(validateResulte)

    const errorKeys = Object.keys(validateResulte)
    if (errorKeys.length !== 0) {
      const key = errorKeys[0]
      alert(validateResulte[key])
      // onErrors();
      refs[key].current.focus()

      setIsSubmitting(false)
    } else {
      try {
        const result = await onSubmit()
        onSuccess(result)
      } catch (e) {
        // console.log({ e })
        onErrors()
      }
    }
  }

  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit
  }
}

// useUser
async function getUserInfo () {
  const { data } = await axios.get(`${GITHUB_API}/user`, {
    headers: {
      Authorization: process.env.REACT_APP_GITHUB_TOKEN,
      'Content-Type': 'application/json'
    }
  })

  return data
}
export function useUser () {
  return useQuery(['userInfo'], getUserInfo)
}

// useFilteredData
export function useFilteredData (searchDataList: List[]) {
  const [filteredData, setFilteredData] = useState(searchDataList)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setFilteredData(searchDataList)
  }, [searchDataList])

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(searchDataList)
    } else {
      const filteredSearchList = searchDataList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredData(filteredSearchList)
    }
  }, [searchDataList, searchValue])

  return { filteredData, searchValue, setSearchValue }
}
