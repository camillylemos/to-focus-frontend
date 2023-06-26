import { useCallback, useEffect, useState } from 'react'
import { PageTitle, TaskItem } from '@components'
import { PRIORITY } from '@constants'
import { useTask } from '@hooks'
import './eisenhower-matrix.style.scss'

const EisenhowerMatrixScreen = () => {
  const [taskList, setTaskList] = useState()

  const { getTasksMatrix, updateTask, deleteTask } = useTask()

  const getTaskList = useCallback(async () => {
    const resultado = await getTasksMatrix()

    if (resultado) {
      setTaskList(resultado)
    }
  }, [getTasksMatrix])

  useEffect(() => {
    getTaskList()
  }, [getTaskList])

  const handleChangeTask = async ({ task, check }) => {
    const data = check ? { ...task, estaRealizado: !task.estaRealizado } : task

    await updateTask({ data, id: task.id })

    getTaskList()
  }

  const handleChangeDeleteTask = async ({ id }) => {
    await deleteTask(id)

    getTaskList()
  }

  const handleClickSaveAlter = async task =>
    await updateTask({ data: task, id: task.id })

  const renderTaskItem = ({ key, color, className }) => {
    return taskList[key].map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        handleChangeTask={handleChangeTask}
        color={color}
        className={className}
        handleClickSaveAlter={handleClickSaveAlter}
        handleClickDelete={handleChangeDeleteTask}
      />
    ))
  }

  const CONFIG_MATRIX = {
    URGENTE_IMPORTANTE: { class: 'urgente-importante', color: '#f29166' },
    NAO_URGENTE_IMPORTANTE: {
      class: 'nao-urgente-importante',
      color: '#f3ca40',
    },
    URGENTE_NAO_IMPORTANTE: {
      class: 'urgente-nao-importante',
      color: '#2e7f7b',
    },
    NAO_URGENTE_NAO_IMPORTANTE: {
      class: 'nao-urgente-nao-importante',
      color: '#788bf5',
    },
  }

  const renderTaskList = () => {
    if (taskList) {
      return PRIORITY.map(({ name, key, value }, index) => {
        return (
          <div
            className={`eisenhower-matrix__container eisenhower-matrix__container__${CONFIG_MATRIX[value].class}`}
            key={index}
          >
            <div
              className={`eisenhower-matrix__titulo eisenhower-matrix__titulo__${CONFIG_MATRIX[value].class}`}
            >
              {name}
            </div>

            <ul className="eisenhower-matrix__list">
              {renderTaskItem({
                key,
                color: CONFIG_MATRIX[value].color,
                className: CONFIG_MATRIX[value].class,
              })}
            </ul>
          </div>
        )
      })
    }
  }

  return (
    <section className="eisenhower-matrix">
      <PageTitle titulo="Matriz de Eisenhower" />
      <div className="eisenhower-matrix__conteudo">{renderTaskList()}</div>
    </section>
  )
}

export { EisenhowerMatrixScreen }
