import createGlobalState from 'react-create-global-state'

const [useGlobalAlert, AlertGlobalProvider] = createGlobalState(false)

export { useGlobalAlert, AlertGlobalProvider }
