import { useCallback, useState } from 'react'

export const useFocusBlur = (deps: any[] = []) => {
  const [focus, setFocus] = useState(false)

  const onFocus = useCallback(() => {
    setFocus(true)
  }, deps)

  const onBlur = useCallback(() => {
    setFocus(false)
  }, [])

  return { onFocus, onBlur, focus }
}
