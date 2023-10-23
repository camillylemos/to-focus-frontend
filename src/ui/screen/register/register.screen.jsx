import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Form, Input } from '@components'
import { UseUser } from '@hooks'
import './register.style.scss'

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
  name: {
    name: 'name',
    label: 'Nome',
  },
  bdayDate: {
    name: 'bdayDate',
    label: 'Data de Nascimento',
  },
}

const CadastroScreen = () => {
  const [formData, setFormData] = useState(FORM_DATA_INITIAL)

  const navigate = useNavigate()

  const { register } = UseUser()

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
        nome: values.name,
        dataNascimento: values.bdayDate,
      }

      await register(data)

      navigate('/login')
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
    <section className="cadastro">
      <h1 className="cadastro__texto">Cadastro</h1>
      <Form
        className="cadastro__form"
        formData={formData}
        onSubmit={handleSubmit}
      >
        <Input
          style={{ paddingBottom: '20px' }}
          formData={formData.name}
          handleChange={handleChange}
        />
        <Input
          style={{ paddingBottom: '20px' }}
          formData={formData.email}
          handleChange={handleChange}
        />
        <Input
          style={{ paddingBottom: '20px' }}
          formData={formData.bdayDate}
          handleChange={handleChange}
        />
        <Input
          style={{ paddingBottom: '20px' }}
          formData={formData.password}
          handleChange={handleChange}
        />
        <Button type="submit">Cadastrar</Button>
        <Link to={'/login'} className="cadastro__link">
          Já tem uma conta? Entre!
        </Link>
      </Form>
    </section>
  )
}

export { CadastroScreen }
