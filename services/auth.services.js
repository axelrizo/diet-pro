
const singUp = async (form) => {
  const url = `${process.env.END_POINT}auth/signup`
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
  singUp
}
