import type { Dayjs } from 'dayjs'

export type DayjsRange = [Dayjs | null, Dayjs | null] | null

interface Flavoring<FlavorT> {
  _type?: FlavorT
}
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>
