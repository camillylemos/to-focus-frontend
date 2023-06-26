const addFormatationEnglishToPortuguese = date => {
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

const addFormatationPortugueseToEnglish = date => {
  const [day, month, year] = date.split('/')

  return `${year}-${month}-${day}`
}

export { addFormatationEnglishToPortuguese, addFormatationPortugueseToEnglish }
