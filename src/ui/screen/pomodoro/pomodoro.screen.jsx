import { useCallback, useEffect, useState } from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import { Helmet } from 'react-helmet-async'
import { useTimer } from 'react-timer-hook'
import { MoreHoriz, Pause, PlayArrow, Refresh } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Chip } from '@components'
import { POMODORO_STATUS, TYPES_CHIPS } from '@constants'
import { useGlobalAlert } from '@contexts'
import { usePomodoro } from '@hooks'
import { formatDigit } from '@utils'
import { FORM_DATA_INITIAL, ModalComponent } from './partials'
import './pomodoro.style.scss'

const PomodoroScreen = () => {
  const [status, setStatus] = useState(POMODORO_STATUS.INITIAL)
  const [formData, setFormData] = useState({ ...FORM_DATA_INITIAL })
  const [pomodoroSettingsList, setPomodoroSettingsList] = useState()
  const [pomodoroId, setPomodoroId] = useState()
  const [pomodoroSelected, setPomodoroSelected] = useState()
  const [pomodoroActive, setPomodoroActive] = useState({
    titulo: '',
    tempo: null,
  })
  const [pomodoroSettings, setPomodoroSettings] = useState({
    focus: 1,
    shortBreak: 0,
    longBreak: 0,
    allPomodoro: false,
  })
  const [openModalSettings, setOpenModalSettings] = useState(false)
  const [value, setValue] = useState(0)

  const [, setAlert] = useGlobalAlert()

  const {
    getPomodoroConfig,
    createPomodoroConfig,
    deletePomodoroConfig,
    startPomodoro,
    finishPomodoro,
  } = usePomodoro()
  const { hours, seconds, minutes, start, pause, restart } = useTimer({
    autoStart: false,
    expiryTimestamp: new Date(),
    onExpire: () => timeActive(),
  })

  const restartInitial = () => {
    setStatus(POMODORO_STATUS.INITIAL)
    setPomodoroActive({ titulo: 'FOCO', tempo: pomodoroSelected.tempoFoco })
  }

  const endPomodoro = async () => {
    await finishPomodoro(pomodoroId)

    setAlert(true)
  }

  const timeActive = () => {
    if (pomodoroSettings.allPomodoro) {
      restartInitial()
      return endPomodoro()
    }

    if (
      pomodoroSettings.focus === 4 &&
      pomodoroSettings.shortBreak === 3 &&
      pomodoroSettings.longBreak === 0
    ) {
      setPomodoroSettings({ ...pomodoroSettings, allPomodoro: true })
      return setPomodoroActive({
        titulo: 'INTERVALO_LONGO',
        tempo: pomodoroSelected.tempoIntervaloLongo,
      })
    }

    if (pomodoroSettings.focus > pomodoroSettings.shortBreak) {
      setPomodoroSettings({
        ...pomodoroSettings,
        shortBreak: pomodoroSettings.shortBreak + 1,
      })
      return setPomodoroActive({
        titulo: 'INTERVALO_CURTO',
        tempo: pomodoroSelected.tempoIntervaloCurto,
      })
    }

    if (pomodoroSettings.shortBreak >= pomodoroSettings.focus) {
      setPomodoroSettings({
        ...pomodoroSettings,
        focus: pomodoroSettings.focus + 1,
      })
      return setPomodoroActive({
        titulo: 'FOCO',
        tempo: pomodoroSelected.tempoFoco,
      })
    }
  }

  const getPomodoroConfigList = useCallback(async () => {
    const resultado = await getPomodoroConfig()

    if (resultado?.length) {
      setPomodoroSettingsList(resultado)
    }
  }, [getPomodoroConfig])

  useEffect(() => {
    getPomodoroConfigList()
  }, [getPomodoroConfigList])

  useEffect(() => {
    if (!pomodoroSelected && pomodoroSettingsList) {
      setPomodoroSelected(
        pomodoroSettingsList.find(({ isVisivel }) => isVisivel === true)
      )
      setPomodoroActive({
        titulo: 'FOCO',
        tempo: pomodoroSettingsList.find(({ isVisivel }) => isVisivel === true)
          .tempoFoco,
      })
    }
  }, [pomodoroSelected, pomodoroSettingsList])

  const countdown = useCallback(time => {
    const newDate = new Date()
    return newDate.setSeconds(newDate.getSeconds() + time * 60)
  }, [])

  useEffect(() => {
    if (pomodoroActive) {
      const date = countdown(pomodoroActive.tempo)

      if (status === POMODORO_STATUS.INITIAL) {
        restart(date, false)
      } else {
        restart(date, true)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomodoroActive, countdown])

  useEffect(() => {
    if (pomodoroActive) {
      const tempoAtual = hours * 3600 + minutes * 60 + seconds

      const valorAtual = Math.abs(
        (100 * tempoAtual) / (pomodoroActive.tempo * 60) - 100
      )

      setValue(valorAtual)
    }
  }, [pomodoroActive, seconds, hours, minutes])

  const handleClickStartPomodoroAfterPause = () => {
    const newDate = new Date()
    newDate.setSeconds(newDate.getSeconds() + seconds)
    newDate.setMinutes(newDate.getMinutes() + minutes)
    newDate.setHours(newDate.getHours() + hours)
    restart(newDate, true)
  }

  const handleClickStartPomodoro = async () => {
    if (status === POMODORO_STATUS.PAUSE) {
      handleClickStartPomodoroAfterPause()
    } else {
      const resultado = await startPomodoro(pomodoroSelected.id)

      if (resultado) {
        setPomodoroId(resultado.id)
        start()
      }
    }

    setStatus(POMODORO_STATUS.PROGRESS)
  }

  const handleClickPausePomodoro = async () => {
    setStatus(POMODORO_STATUS.PAUSE)
    pause()
  }

  const handleClickRestartPomodoro = async () => {
    setStatus(POMODORO_STATUS.INITIAL)
    restartInitial()
  }

  const handleSubmit = async ({ isValid, values }) => {
    if (isValid && values) {
      const data = {
        nomeCategoria: values.name,
        tempoFoco: values.pomodoro,
        tempoIntervaloCurto: values.shortBreak,
        tempoIntervaloLongo: values.longBreak,
      }

      await createPomodoroConfig(data)
      getPomodoroConfigList()
      setFormData({ ...FORM_DATA_INITIAL })
    }
  }

  const handleClickDelete = async ({ id, evento }) => {
    evento.stopPropagation()

    await deletePomodoroConfig(id)
    getPomodoroConfigList()
  }

  const handleClick = ({
    id,
    nomeCategoria,
    tempoFoco,
    tempoIntervaloCurto,
    tempoIntervaloLongo,
  }) => {
    setPomodoroSelected({
      id,
      nomeCategoria,
      tempoFoco,
      tempoIntervaloCurto,
      tempoIntervaloLongo,
    })
    setPomodoroActive({ titulo: 'FOCO', tempo: tempoFoco })
    setStatus(POMODORO_STATUS.INITIAL)
    setOpenModalSettings(false)
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

  const handleClickModalSettings = () => {
    setOpenModalSettings(!openModalSettings)
  }

  const buttonConfig =
    status === POMODORO_STATUS.PROGRESS
      ? {
          onClick: handleClickPausePomodoro,
          icon: <Pause className="pause__icon" />,
        }
      : {
          onClick: handleClickStartPomodoro,
          icon: <PlayArrow className="play__icon" />,
        }

  return (
    <>
      <Helmet>
        <title>{`Pomodoro | To Focus`}</title>
      </Helmet>
      <section className="pomodoro">
        <main className="pomodoro__progress-bar">
          <CircularProgressbarWithChildren
            value={value}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#F29166',
              trailColor: '#2E7F7B',
              strokeLinecap: 'round',
            })}
          >
            <div className="pomodoro__timer__text">
              {!!hours && <span>{formatDigit(hours)}:</span>}
              <span>{formatDigit(minutes)}</span>:
              <span>{formatDigit(seconds)}</span>
            </div>
          </CircularProgressbarWithChildren>
        </main>

        <div className="pomodoro__ciclo">
          <Chip type={TYPES_CHIPS.FOCUS} className={pomodoroActive.titulo} />
          <Chip
            type={TYPES_CHIPS.SHORT_BREAK}
            className={pomodoroActive.titulo}
          />
          <Chip
            type={TYPES_CHIPS.LONG_BREAK}
            className={pomodoroActive.titulo}
          />
        </div>

        <div>
          <Button
            variant="contained"
            onClick={handleClickModalSettings}
            sx={{
              width: 60,
              height: 60,
              borderRadius: 5,
              opacity: 0.25,
            }}
            color="secondary"
          >
            {<MoreHoriz className="dots__icon" />}
          </Button>

          <Button
            variant="contained"
            onClick={buttonConfig.onClick}
            sx={{
              width: 90,
              height: 80,
              borderRadius: 5,
              margin: 1,
            }}
            color="secondary"
          >
            {buttonConfig.icon}
          </Button>

          <Button
            variant="contained"
            onClick={handleClickRestartPomodoro}
            sx={{
              width: 60,
              height: 60,
              borderRadius: 5,
              opacity: 0.25,
            }}
            color="secondary"
          >
            {<Refresh className="refresh__icon" />}
          </Button>
        </div>
      </section>

      <ModalComponent
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleClick={handleClick}
        handleClickDelete={handleClickDelete}
        handleClickClose={handleClickModalSettings}
        pomodoroSettingsList={pomodoroSettingsList}
        open={openModalSettings}
      />
    </>
  )
}

export { PomodoroScreen }
