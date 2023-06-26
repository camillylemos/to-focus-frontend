/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useAxios } from './use-axios'

const UseAuthentication = () => {
  const { get } = useAxios()

  const getAuthenticationControl = async () => get('/autenticacao/controle')

  const getAuthenticationDays = async () => get('/autenticacao')

  return useMemo(
    () => ({
      getAuthenticationControl,
      getAuthenticationDays,
    }),
    []
  )
}

export { UseAuthentication }
