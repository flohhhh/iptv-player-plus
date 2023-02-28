// const seconds = 3600

export const formatTime = (seconds: number) => {
  // @ts-ignore
  const date = new Date(null)
  date.setSeconds(seconds)
  const hhmmssFormat = date.toISOString().substr(11, 8)
  return hhmmssFormat
}

export const dateFromTime = (seconds: string | undefined) => {
  if (seconds === undefined) return ''
  const date = new Date(Number(seconds) * 1000)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
