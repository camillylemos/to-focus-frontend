import { TYPES_CHIPS } from '@constants'
import './chip.style.scss'

const Chip = ({ type, className }) => {
  const ativoClass = type.key === className ? 'ativo' : ''

  return (
    <span className={`chip chip__${type.class} ${ativoClass}`}>
      {type.icon}
      <span className="chip__texto">{type.text}</span>
    </span>
  )
}

Chip.defaultProps = {
  className: '',
  tipoEtiqueta: TYPES_CHIPS.PATTERN,
  title: '',
}

export { Chip }
