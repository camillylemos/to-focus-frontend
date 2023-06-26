const RequestParams = ({ url, dados = {} }) => {
  const urlMontada = Object.entries(dados).reduce((acc, [nome, valor]) => {
    const invalidFieldValues = [undefined, null, '']

    if (invalidFieldValues.includes(valor)) {
      return acc
    } else if (Array.isArray(valor)) {
      const itensRepetidos = valor
        .filter(item => !invalidFieldValues.includes(item))
        .map(item => `${nome}=${item}`)
        .reduce((string, parametro) => `${string}${parametro}&`, '')

      return `${acc}${itensRepetidos}`
    } else {
      return `${acc}${nome}=${valor}&`
    }
  }, `${url}?`)
  return urlMontada.slice(0, -1)
}

export { RequestParams }
