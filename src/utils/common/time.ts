/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { DayjsRange } from '#/types/common'
import type { DatePickerProps } from 'antd'
import type { QUnitType } from 'dayjs'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import customParseFormat from 'dayjs/plugin/customParseFormat'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(LocalizedFormat)
dayjs.locale('ru')

export enum DateFormat {
  'MMM DD YYYY',
  'HH:mm',
  'LLLL',
  'H:mm:ss A',
  'YYYY-MM-DD',
  'YYYY-MM-DD dddd',
  'YYYY-MM-DD ddd',
  'MM-DD ddd',
  'MM-DD',
  'DD/MM',
  'dddd',
  'YYYY'
}

export const isTwoDateDifference = (
  atDate: string | Date,
  toDate: string | Date,
  unit: QUnitType
) => {
  const at = dayjs(atDate)
  const to = dayjs(toDate)

  return to.diff(at, unit)
}

export const parseDate = (time: string | Date, format: keyof typeof DateFormat) =>
  dayjs(time).format(format)

export const relativeTimeFromNow = (time: Date | string, current = new Date()) => {
  time = new Date(time)
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = +current - +time

  if (elapsed < msPerMinute) {
    const gap = Math.ceil(elapsed / 1000)
    return gap <= 0 ? 'только что' : `${gap} несколько секунд назад`
  }
  if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} минут назад`
  }
  if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} часов назад`
  }
  if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} дней назад`
  }
  if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} полгода назад`
  }
  return `${Math.round(elapsed / msPerYear)} год назад`
}
export const dayOfYear = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  return day
}

export function daysOfYear(year?: number) {
  return isLeapYear(year ?? new Date().getFullYear()) ? 366 : 365
}

export function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}

export const secondOfDay = (day?: dayjs.Dayjs) => {
  const dt = day?.toDate?.() ?? new Date()
  const secs = dt.getSeconds() + 60 * (dt.getMinutes() + 60 * dt.getHours())
  return secs
}

export const secondOfDays = 86400

export function hms(seconds: number): string {
  // @ts-ignore
  // return [3600, 60] // 00:00:00
  return [60]
    .reduceRight(
      // @ts-ignore
      (p, b) => (r) => [Math.floor(r / b)].concat(p(r % b)),
      (r) => [r]
    )(seconds)
    .map((a) => a.toString().padStart(2, '0'))
    .join(':')
}

const weekFormat = 'DD/MM'
export const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`

export const clearedToday = () => dayjs(new Date().setHours(0, 0, 0, 0))
export const isFullDay = (from: Date, to: Date) =>
  dayjs(from).diff(dayjs(to), 'seconds') === secondOfDays

export const timeRangeInRange = (innerRange: DayjsRange, outerRange: DayjsRange) =>
  (secondOfDay(dayjs(innerRange[0])) >= secondOfDay(outerRange[0]) &&
    secondOfDay(dayjs(innerRange[0])) <= secondOfDay(outerRange[1])) ||
  (secondOfDay(dayjs(innerRange[1])) <= secondOfDay(outerRange[0]) &&
    secondOfDay(dayjs(innerRange[1])) >= secondOfDay(outerRange[1]))

export const timeInRange = (time: dayjs.Dayjs, outerRange: DayjsRange) =>
  secondOfDay(dayjs(time)) >= secondOfDay(outerRange[0]) &&
  secondOfDay(dayjs(time)) <= secondOfDay(outerRange[1])
