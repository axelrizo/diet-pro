
const createNewPerson = async (form, token) => {
  const url = `${process.env.END_POINT}person`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(form)
  })
  const data = await response.json()
  return data
}

export {
  createNewPerson
}
