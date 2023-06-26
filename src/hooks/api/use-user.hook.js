/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useAxios } from './use-axios'

const UseUser = () => {
  const { get, post } = useAxios()
  const login = async data => await post('/usuario/login', data)

  const register = data => post(`/usuario/cadastrar`, data)

  const infoUser = () => get('/usuario/me')

  return useMemo(
    () => ({
      register,
      login,
      infoUser,
    }),
    []
  )
}

export { UseUser }
