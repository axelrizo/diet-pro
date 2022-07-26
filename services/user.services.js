
const register = async (form) => {
  const url = `${process.env.END_POINT}/user`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  const data = await response.json()
  return data
}

const login = async (form) => {
  const url = `${process.env.END_POINT}/user/login`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  const data = await response.json()
  return data
}

export {
  register,
  login
}
