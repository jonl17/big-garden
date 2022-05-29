const KEY = 'Sculpture Hunt Username'

export const saveUserToLocalStorage = (
  username: string
) => {
  localStorage.setItem(KEY, JSON.stringify(username))
}

export const getUserFromLocalStorage = ():
  | string
  | null => {
  const user = localStorage.getItem(KEY)
  return user ? JSON.parse(user) : null
}
