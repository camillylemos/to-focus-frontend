import createGlobalState from 'react-create-global-state'

const stringifyUser = localStorage.getItem('user')

const user = JSON.parse(stringifyUser) || null

const [useGlobalUser, UserGlobalProvider] = createGlobalState(user)

export { useGlobalUser, UserGlobalProvider }
