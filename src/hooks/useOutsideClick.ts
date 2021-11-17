import { useEffect } from 'react'

const useOutsideClick = (element: HTMLElement, callback: Function, options: { when: boolean[] }) => {

  const containsOnlyTrue = (): boolean => {
    let onlyTrue: boolean = true

    options?.when?.forEach((el) => {
      if (!el) {
        onlyTrue = false
      }
    })

    return onlyTrue
  }

  useEffect(() => {
    document.addEventListener('click', (e: Event) => {
      if (!element.contains(e.target as Node) && containsOnlyTrue()) {
        callback()
      }
    })
  }, [])
}

export default useOutsideClick
