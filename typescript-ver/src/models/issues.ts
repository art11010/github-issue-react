import { type BadgeProps } from '../components/Badge'

export interface DataItem {
  login: string
  title: string
  description: string
}

export interface Data {
  data: DataItem[]
}

export type List = Partial<DataItem> & { name: string }

export enum STATE {
  OPEN = 'open',
  CLOSED = 'closed'
}

export interface ListItemType {
  id: string
  title: string
  labels: BadgeProps[]
  state: STATE
  created_at: string
  closed_at: string
  number: number
}
