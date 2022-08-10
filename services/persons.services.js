// create

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

// read

const getAllPersons = async (idUser, firstDate, secondDate, token) => {
  const url = `${process.env.END_POINT}person/person-weight/all?idUser=${idUser}&firstDate=${firstDate}&secondDate=${secondDate}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
  return await response.json()
}

// update

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

// delete

export {
  createNewPerson,
  createNewPersonWeight,
  getAllPersons,
  updatePersonWeight
}
