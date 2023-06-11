import dayJs from 'dayjs'

export const formatTime = val => {
  return dayJs(val).format('YYYY-MM-DD')
}
