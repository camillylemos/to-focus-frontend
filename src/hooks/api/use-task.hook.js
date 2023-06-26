/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useAxios } from './use-axios'

const useTask = () => {
  const { get, post, put, del } = useAxios()

  const getTasks = () => get('/tarefa')

  const getTasksMatrix = () => get('/tarefa/matriz')

  const createTask = data => post(`/tarefa`, data)

  const updateTask = ({ data, id }) => put(`/tarefa/${id}`, data)

  const deleteTask = id => del(`/tarefa/${id}`)

  return useMemo(
    () => ({
      getTasks,
      getTasksMatrix,
      createTask,
      updateTask,
      deleteTask,
    }),
    []
  )
}

export { useTask }
