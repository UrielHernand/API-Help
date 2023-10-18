function userGet (id: string) {
  return fetch(`https://reqres.in/api/users/${id}`)
}

export default  userGet;