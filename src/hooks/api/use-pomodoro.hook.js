/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useGlobalToken } from '@contexts'
import { useAxios } from './use-axios'

const pomodoroConfig = [
  {
    id: 1,
    nomeCategoria: 'PADRAO',
    tempoFoco: 25,
    tempoIntervaloCurto: 5,
    tempoIntervaloLongo: 15,
    isVisivel: true,
  },
]

const usePomodoro = () => {
  const [token] = useGlobalToken()

  const { get, post, put, del } = useAxios()

  const isAutenticado = !!token

  const getPomodoroConfig = () => {
    if (!isAutenticado) {
      const listString = localStorage.getItem('pomodoro-config')
      const listLocal = JSON.parse(listString)

      if (listLocal) {
        return listLocal
      }

      localStorage.setItem('pomodoro-config', JSON.stringify(pomodoroConfig))

      return pomodoroConfig
    }

    return get('/pomodoro')
  }

  const createPomodoroConfig = data => {
    if (!isAutenticado) {
      const listString = localStorage.getItem('pomodoro-config')
      const listLocal = JSON.parse(listString)

      listLocal.push({ ...data, isVisivel: true })

      localStorage.setItem('pomodoro-config', JSON.stringify(listLocal))

      return listLocal
    }

    return post('/pomodoro', data)
  }

  const deletePomodoroConfig = id => del(`/pomodoro/${id}`)

  const startPomodoro = id => {
    if (!isAutenticado) {
      return true
    }

    return post(`/pomodoro/iniciar/${id}`)
  }

  const finishPomodoro = id => {
    if (!isAutenticado) {
      return true
    }
    return put(`/pomodoro/finalizar/${id}`)
  }

  return useMemo(
    () => ({
      getPomodoroConfig,
      createPomodoroConfig,
      deletePomodoroConfig,
      startPomodoro,
      finishPomodoro,
    }),
    []
  )
}

export { usePomodoro }
