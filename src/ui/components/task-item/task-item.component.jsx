import { useEffect, useState } from 'react'
import { Clear, LocalOffer } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Checkbox } from '@components'
import './task-item.style.scss'

const TaskItem = ({
  task,
  handleChangeTask,
  color,
  name,
  className,
  handleClickSaveAlter,
  isTask,
  handleClickDelete,
}) => {
  const [valueTitle, setValueTitle] = useState(task?.titulo)
  const [valueDescription, setValueDescription] = useState(task.descricao)

  useEffect(() => {
    setValueTitle(task?.titulo)
    setValueDescription(task.descricao)
  }, [task])

  const value = task.estaRealizado ? { checked: true } : { checked: false }

  const classRealizado = task.estaRealizado ? '--realizado' : ''

  const classeTipo = isTask ? 'task__item' : 'eisenhower-matrix__item'

  const handleChangeTitle = event => setValueTitle(event.target.value)

  const handleChangeDescription = event =>
    setValueDescription(event.target.value)

  const handleBlurSaveAlter = () => {
    if (valueTitle !== task.titulo || valueDescription !== task.descricao) {
      handleClickSaveAlter(
        (task = { ...task, titulo: valueTitle, descricao: valueDescription })
      )
    }
  }

  return (
    !!task.visivel && (
      <li className={classeTipo} key={task.id}>
        <div className="eisenhower-matrix__item__principal">
          <div className={`${classeTipo}__principal__esquerda`}>
            <Checkbox
              value={value}
              handleChange={() => handleChangeTask({ task, check: true })}
              color={color}
            />

            <textarea
              disabled={task.estaRealizado}
              autoComplete="off"
              rows="1"
              spellCheck="false"
              className={`eisenhower-matrix__item__principal__esquerda__texto${classRealizado}`}
              value={valueTitle}
              onChange={handleChangeTitle}
              onBlur={handleBlurSaveAlter}
            />
          </div>

          {isTask && (
            <div
              className={`task__item__principal__esquerda__${className} task__item__principal__esquerda${classRealizado}`}
            >
              <span>{name}</span>
              <LocalOffer />
            </div>
          )}

          {!task.estaRealizado && (
            <IconButton
              sx={{
                color: '#f5f5f5',
                '&:hover': {
                  color: 'rgba(0, 0, 0, 0.54)',
                },
              }}
              className="botao"
              onClick={() => {
                handleClickDelete({ id: task.id })
              }}
            >
              <Clear />
            </IconButton>
          )}
        </div>

        {task.descricao && (
          <textarea
            disabled={task.estaRealizado}
            autoComplete="off"
            rows="1"
            spellCheck="false"
            className={`${classeTipo}__descricao${classRealizado} ${classeTipo}__descricao__${className}`}
            value={valueDescription}
            onChange={handleChangeDescription}
            onBlur={handleBlurSaveAlter}
          />
        )}
      </li>
    )
  )
}

export { TaskItem }
