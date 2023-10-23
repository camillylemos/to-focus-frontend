import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountCircle } from '@mui/icons-material'
import { Alert, Typography } from '@mui/material'
import { logo } from '@assets'
import { useGlobalAlert, useGlobalToken } from '@contexts'
import './header.style.scss'

let timeoutID

const Header = () => {
  const [token] = useGlobalToken()
  const [alert, setAlert] = useGlobalAlert()

  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    setAlert(false)
  }, [setAlert])

  useEffect(() => {
    if (alert) {
      timeoutID = setTimeout(handleClose, 3000)
    }
  }, [alert, handleClose])

  return (
    <>
      {alert && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ borderRadius: ['0px', '0px', '0px', '0px'] }}
        >
          Pomodoro concluído com sucesso. Parabéns!
        </Alert>
      )}
      <header className="header">
        <img className="header__logo" src={logo} alt="" />
        <button className="header__icon" onClick={() => navigate('/login')}>
          {!token &&
            <Typography
              sx={{ mr: 1, textDecoration: 'underline' }}
              color="secondary"
            >
              Faça login
            </Typography>
          }

          <AccountCircle sx={{ fontSize: 50 }} color="secondary" />
        </button>
      </header>
    </>
  )
}

export { Header }
