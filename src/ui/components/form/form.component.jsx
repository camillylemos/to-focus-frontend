import PropTypes from 'prop-types'

const Form = ({ onSubmit, formData, children, ...props }) => {
  const handleSubmit = evento => {
    evento.preventDefault()
    const isValid = Object.values(formData).every(
      data => data.isValid !== false
    )

    const values = Object.keys(formData).reduce(
      (data, key) => ({ ...data, [key]: formData[key].value }),
      {}
    )

    onSubmit({ values, isValid })
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
}

export { Form }
