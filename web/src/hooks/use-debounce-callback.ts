import { useCallback, useRef } from 'react'

export function useDebounceCallback <F extends (...args: any[]) => void> (
  callback: F,
  delay: number,
  dependencies: any[] = []
) {
  const timer = useRef<number | null>(null)

  return useCallback((...args: Parameters<F>) => {
    if (timer.current != null) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay, ...dependencies])
}
