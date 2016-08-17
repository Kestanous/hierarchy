const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^.{8,}$/
export default FormValidators = {
  username(value = '') {
    if (!value) return 'Please spesify a username'
  },
  email(value = '') {
    if (!emailRegex.test(value)) return 'Email not valid'
  },
  password(value = '') {
    if (!passwordRegex.test(value)) return 'Passwords should be at least 8 characters long'
  },
  confirmPassword(value = '', others) {
    if (value != others.password) return 'Passwords must match'
  },
  GameGeneral: {
    name(value) {
      if (!value) return 'Games must have a name'
    },
    cover(value) {},
    description(value) {}
  }
}
