import { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Form, Input, PageTitle, Select, TaskItem, Textarea } from '@components'
import { useTask } from '@hooks'
import { FORM_DATA_INITIAL } from './form-data.constant'
import './task.style.scss'

const CONFIG_TASK = {
  URGENTE_IMPORTANTE: {
    class: 'urgente-importante',
    color: '#f29166',
    name: 'Urgente e Importante',
  },
  NAO_URGENTE_IMPORTANTE: {
    class: 'nao-urgente-importante',
    color: '#f3ca40',
    name: 'Não Urgente e Importante',
  },
  URGENTE_NAO_IMPORTANTE: {
    class: 'urgente-nao-importante',
    color: '#2e7f7b',
    name: 'Urgente e Não Importante',
  },
  NAO_URGENTE_NAO_IMPORTANTE: {
    class: 'nao-urgente-nao-importante',
    color: '#788bf5',
    name: 'Não Urgente e Não Importante',
  },
}

const TaskScreen = () => {
  const [taskList, setTaskList] = useState()
  const [formData, setFormData] = useState({ ...FORM_DATA_INITIAL })

  const { getTasks, createTask, updateTask, deleteTask } = useTask()

  const getTaskList = useCallback(async () => {
    const resultado = await getTasks()

    if (resultado) {
      setTaskList(resultado)
    }
  }, [getTasks])

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

  const renderTasks = () => {
    if (taskList) {
      return taskList.map(task =>
        Object.values(task)?.map(tasks =>
          tasks?.map((task, index) => {
            return (
              <TaskItem
                key={index}
                task={task}
                color={CONFIG_TASK[task.prioridade].color}
                className={CONFIG_TASK[task.prioridade].class}
                name={CONFIG_TASK[task.prioridade].name}
                handleChangeTask={handleChangeTask}
                handleClickSaveAlter={handleClickSaveAlter}
                isTask={true}
                handleClickDelete={handleChangeDeleteTask}
              />
            )
          })
        )
      )
    }
  }

  const handleSubmit = async ({ isValid, values }) => {
    if (formData.task) {
      const updateTask = {
        ...formData.task,
        descricao: values.description,
        prioridade: values.priority,
        titulo: values.title,
      }

      handleChangeTask({ task: updateTask })
      setFormData({ ...FORM_DATA_INITIAL })
    } else {
      if (isValid && values) {
        const data = {
          descricao: values.description,
          prioridade: values.priority,
          titulo: values.title,
        }

        const resultado = await createTask(data)

        if (resultado) {
          setFormData({ ...FORM_DATA_INITIAL })
          getTaskList()
        }
      }
    }
  }

  const handleChange = event => {
    const { name, value } = event.target

    setFormData(formData => ({
      ...formData,
      [name]: {
        ...formData[name],
        value,
        name,
      },
    }))
  }

  // SpeedDialIcon

  return (
    <section className="task">
      <PageTitle titulo="Lista de Tarefas" />
      <Form className="task__form" onSubmit={handleSubmit} formData={formData}>
        <Input formData={formData.title} handleChange={handleChange} />
        <Select formData={formData.priority} handleChange={handleChange} />
        <Textarea
          className="task__form__textarea"
          formData={formData.description}
          handleChange={handleChange}
        />
        <Button
          sx={{
            color: 'white',
          }}
          variant="contained"
          type="submit"
        >
          Salvar
        </Button>
      </Form>

      <ul className="task__lista">{renderTasks()}</ul>
    </section>
  )
}

export { TaskScreen }
