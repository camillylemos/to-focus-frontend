import createGlobalState from 'react-create-global-state'

const [RoutesConfigGlobal, RoutesConfigGlobalProvider] =
  createGlobalState('PomodoroScreen')

export { RoutesConfigGlobal, RoutesConfigGlobalProvider }
