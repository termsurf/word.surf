import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default dayjs

export function toSlug(date: Dayjs) {
  return date.format('YYYY_MM_DD_HH_mm')
}

export function nowToSlug() {
  return toSlug(dayjs.utc())
}

export function nowUTC() {
  return dayjs.utc().toDate()
}
