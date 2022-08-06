
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
  return await response.json()
}

const createNewPersonWeight = async (form, token) => {
  const url = `${process.env.END_POINT}person/person-weight`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(form)
  })
  return await response.json()
}

const getAllPersons = async (idUser, firstDate, secondDate, token) => {
  const dataInput = { idUser, firstDate, secondDate }

  const url = `${process.env.END_POINT}person/all`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(dataInput)
  })
  return await response.json()
}

const updatePersonWeight = async (form, token) => {
  const url = `${process.env.END_POINT}person/person-weight`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(form)
  })
  return await response.json()
}

export {
  createNewPerson,
  createNewPersonWeight,
  getAllPersons,
  updatePersonWeight
}
