import { ReactComponent as Break } from '@assets/icons/break.svg'
import { ReactComponent as Focus } from '@assets/icons/focus.svg'

const TYPES_CHIPS = {
  FOCUS: {
    icon: <Focus />,
    text: 'Foco',
    class: 'focus',
    key: 'FOCO',
  },
  SHORT_BREAK: {
    icon: <Break />,
    text: 'Intervalo Curto',
    class: 'short-break',
    key: 'INTERVALO_CURTO',
  },
  LONG_BREAK: {
    icon: <Break />,
    text: 'Intervalo Longo',
    class: 'long-break',
    key: 'INTERVALO_LONGO',
  },
  PADRAO: { icone: null, texto: '', class: 'padrao' },
}

export { TYPES_CHIPS }
