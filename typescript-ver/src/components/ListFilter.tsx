import { useEffect, useState } from 'react'
import Modal from './Modal'

import { GITHUB_API } from '../api/api'
import { type Data, type List } from '../models/issues'

import axios from 'axios'
import styles from './ListFilter.module.css'

export default function ListFilter ({ onChangeFilter }: {
  onChangeFilter: (value: Record<string, string>) => void
}) {
  const [showModal, setShowModal] = useState<string>()
  const [list, setList] = useState<List[]>([])
  const filterList = ['Label', 'Milestone', 'Assignee']

  async function getData (apiPath: string) {
    const { data }: Data = await axios.get(
      `${GITHUB_API}/repos/facebook/react/${apiPath}`
    )

    let result: ((prevState: List[]) => List[]) | Array<{ name: string }> = []

    switch (apiPath) {
      case 'assignees':
        result = data.map((d) => ({ name: d.login }))
        break
      case 'milestones':
        result = data.map((d) => ({ name: d.title }))
        break
      default:
        data.map((d) => ({
          ...d,
          name: ''
        }))
        break
    }

    setList(result)
  }

  useEffect(() => {
    if (showModal) {
      const apiPath = `${showModal.toLowerCase()}s`
      void getData(apiPath)
    }
  }, [showModal])

  return (
    <>
      <div className={styles.filterLists}>
        {filterList.map((filter) => (
          <ListFilterItem
            key={filter}
            searchDataList={list}
            onClick={() => { setShowModal(filter) }}
            onClose={() => { setShowModal(undefined) }}
            showModal={showModal === filter}
            onChangeFilter={onChangeFilter}
          >
            {filter}
          </ListFilterItem>
        ))}
      </div>
    </>
  )
}

interface ListItemLayoutProps {
  children: string
  placeholder?: string
  searchDataList: List[]
  showModal: boolean
  onClick: () => void
  onClose: () => void
  onChangeFilter: (value: Record<string, string>) => void
}
function ListFilterItem ({
  children,
  placeholder,
  searchDataList,
  showModal,
  onClick,
  onClose,
  onChangeFilter
}: ListItemLayoutProps) {
  // const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState(searchDataList)

  useEffect(() => {
    setList(searchDataList)
  }, [searchDataList])
  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={onClick}>
        {children} ▾
      </span>
      <div className={styles.modalContainer}>
        <Modal
          title={children}
          opened={showModal}
          onClose={onClose}
          placeholder={placeholder}
          searchDataList={list}
          onClickCell={(params) => {
            // 클린 된 정보를 통해 list 필터링
            onChangeFilter(params)
          }}
        />
      </div>
    </div>
  )
}
