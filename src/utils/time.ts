// const seconds = 3600

export const formatTime = (seconds: number) => {
  // @ts-ignore
  const date = new Date(null)
  date.setSeconds(seconds)
  const hhmmssFormat = date.toISOString().substr(11, 8)
  return hhmmssFormat
}
