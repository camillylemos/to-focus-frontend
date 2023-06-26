/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useAxios } from './use-axios'

const UseData = () => {
  const { get } = useAxios()

  const getData = () => get('/estatistica')

  return useMemo(
    () => ({
      getData,
    }),
    []
  )
}

export { UseData }
