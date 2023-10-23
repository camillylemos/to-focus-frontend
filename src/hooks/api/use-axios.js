import axios from 'axios'
import { METODOS_API } from '@constants'
import { useGlobalToken } from '@contexts'
import { RequestParams } from '@utils'

const requisicaoAxios = axios.create({
  //baseURL: 'https://to-focus-backend-8603717bcb7b.herokuapp.com/',
    // baseURL: 'http://localhost:8080/'
   baseURL: 'https://to-focus-backend-production.up.railway.app',
})

const useAxios = () => {
  const [token, setToken] = useGlobalToken()

  const chamarAPI = async (method, url, dadosRequisicao, config = {}) => {
    const headers = token ? { Authorization: `${token}` } : null

    const configRequisicao = {
      method,
      url,
      data: dadosRequisicao,
      headers,
      ...config,
    }

    try {
      const requisicao = await requisicaoAxios.request(configRequisicao)
      return requisicao.data
    } catch (requisicaoFalha) {
      const { response, status } = requisicaoFalha
      if (status === 401) {
        setToken(null)
        localStorage.setItem('token', JSON.stringify(null))
      }
      // return response?.data TODO ARRUMAR AQUI
      return null
    }
  }
  const get = (url, dados, config) => {
    return chamarAPI(
      METODOS_API.GET,
      RequestParams({ url, dados }),
      null,
      config
    )
  }

  const post = (url, data, config) =>
    chamarAPI(METODOS_API.POST, url, data, config)

  const put = (url, data, config) =>
    chamarAPI(METODOS_API.PUT, url, data, config)

  const patch = (url, data, config) =>
    chamarAPI(METODOS_API.PATCH, url, data, config)

  const del = (url, config) => chamarAPI(METODOS_API.DELETE, url, null, config)

  return {
    get,
    post,
    put,
    del,
    patch,
  }
}

export { useAxios }
