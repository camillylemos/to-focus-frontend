import { useNavigate } from 'react-router-dom'
import {
  FormatListBulletedRounded,
  GridViewRounded,
  Insights,
  TimerOutlined,
} from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { RoutesConfigGlobal, useGlobalToken } from '@contexts'
import './menu.style.scss'

const style = {
  borderRadius: 5,
  margin: 0.4,
  width: 60,
  height: 60,
}

const Menu = () => {
  const [, setRoutesConfig] = RoutesConfigGlobal()
  const [token] = useGlobalToken()

  const navigate = useNavigate()

  const handleClick = screen => {
    setRoutesConfig(screen)
  }

  const renderButtons = () => (
    <>
      <Button
        variant="contained"
        onClick={() => handleClick('PomodoroScreen')}
        sx={style}
        color="primary"
      >
        {<TimerOutlined className="pomodoro__icon" />}
      </Button>

      <Button
        variant="contained"
        onClick={() => handleClick('EisenhowerMatrixScreen')}
        sx={style}
        color="primary"
      >
        {<GridViewRounded className="matrix__icon" />}
      </Button>

      <Button
        variant="contained"
        onClick={() => handleClick('TaskScreen')}
        sx={style}
        color="primary"
      >
        {<FormatListBulletedRounded className="list__icon" />}
      </Button>

      <Button
        variant="contained"
        onClick={() => handleClick('RelatorioScreen')}
        sx={style}
        color="primary"
      >
        {<Insights className="graphic__icon" />}
      </Button>
    </>
  )

  const renderButtonsWithoutAuthentication = () => (
    <>
      <Button
        variant="contained"
        onClick={() => handleClick('PomodoroScreen')}
        sx={style}
        color="primary"
      >
        {<TimerOutlined className="pomodoro__icon" />}
      </Button>

      <Tooltip
        title="Crie uma conta para acessar a Matriz de Eisenhower"
        placement="left"
        arrow="true"
      >
        <Button
          variant="contained"
          onClick={() => navigate('/cadastro')}
          sx={style}
          color="primary"
        >
          {<GridViewRounded className="matrix__icon" />}
        </Button>
      </Tooltip>

      <Tooltip
        title="Crie uma conta para acessar a Lista de Tarefas"
        placement="left"
        arrow="true"
      >
        <Button
          variant="contained"
          onClick={() => navigate('/cadastro')}
          sx={style}
          color="primary"
        >
          {<FormatListBulletedRounded className="list__icon" />}
        </Button>
      </Tooltip>

      <Tooltip
        title="Crie uma conta para visualizar suas estátisticas"
        placement="left"
        arrow="true"
      >
        <Button
          variant="contained"
          onClick={() => navigate('/cadastro')}
          sx={style}
          color="primary"
        >
          {<Insights className="graphic__icon" />}
        </Button>
      </Tooltip>
    </>
  )

  return (
    <aside className="menu">
      {token ? renderButtons() : renderButtonsWithoutAuthentication()}
    </aside>
  )
}

export { Menu }
