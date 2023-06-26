import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'
import './page-title.style.scss'

const PageTitle = ({ titulo, className = '', tituloVisivel, ...props }) => {
  return (
    <>
      <Helmet>
        <title>{`${titulo} | To Focus`}</title>
      </Helmet>
      <h1
        data-cy="titulo-principal"
        className={`c-titulo ${className}`}
        {...props}
      >
        {tituloVisivel || titulo}
      </h1>
    </>
  )
}

PageTitle.propTypes = {
  titulo: PropTypes.string.isRequired,
  tituloVisivel: PropTypes.string,
  className: PropTypes.string,
}

PageTitle.defaultProps = {
  tituloVisivel: '',
}

export { PageTitle }
