import { useCallback, useEffect, useState } from 'react'
import { LocalFireDepartment } from '@mui/icons-material'
import { useGlobalToken } from '@contexts'
import { UseAuthentication } from '@hooks'
import './footer.style.scss'

const Footer = () => {
  const [dias, setDias] = useState()
  const [mostrar, setMostrar] = useState()
  const [token] = useGlobalToken()

  const { getAuthenticationDays } = UseAuthentication()

  useEffect(() => {
    setMostrar(!!token)
  }, [token])

  const getAuthenticationDaysApi = useCallback(async () => {
    const qntDias = await getAuthenticationDays()
    setDias(qntDias)
  }, [getAuthenticationDays])

  useEffect(() => {
    getAuthenticationDaysApi()
  }, [getAuthenticationDaysApi])

  return (
    <footer className="footer">
      {mostrar && (
        <div className="footer__config">
          <LocalFireDepartment sx={{ fontSize: 29 }} color="primary" />
          <div className="footer__dias">{dias}</div>
        </div>
      )}
    </footer>
  )
}

export { Footer }
