import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Form, Input } from '@components'
import { useGlobalToken } from '@contexts'
import { UseUser } from '@hooks'
import './login.style.scss'

const FORM_DATA_INITIAL = {
  email: {
    name: 'email',
    label: 'E-mail',
  },
  password: {
    name: 'password',
    label: 'Senha',
    type: 'password',
  },
}

const LoginScreen = () => {
  const [formData, setFormData] = useState(FORM_DATA_INITIAL)
  const [, setToken] = useGlobalToken()

  const navigate = useNavigate()

  const { login } = UseUser()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token'))) {
      navigate('/to-focus-frontend')
    }
  }, [navigate])

  const handleSubmit = async ({ isValid, values }) => {
    if (isValid && values) {
      const data = {
        email: values.email,
        senha: values.password,
      }

      const response = await login(data)

      if (response) {
        setToken(response.token)
        localStorage.setItem('token', JSON.stringify(response.token))
        navigate('/to-focus-frontend')
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

  return (
    <section className="login">
      <h1 className="login__texto">Login</h1>
      <Form className="login__form" formData={formData} onSubmit={handleSubmit}>
        <Input
          formData={formData.email}
          handleChange={handleChange}
          style={{ paddingBottom: '20px' }}
        />
        <Input
          formData={formData.password}
          handleChange={handleChange}
          style={{ paddingBottom: '20px' }}
        />
        <Button type="submit">Entrar</Button>
        <Link to={'/cadastro'} className="login__link">
          Ainda não tem uma conta? Cadastre-se!
        </Link>
      </Form>
    </section>
  )
}

export { LoginScreen }
