const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default FormValidators = {
  GameGeneral: {
    name(value) {
      if (!value) return 'Games must have a name'
    },
    cover(value) {},
    description(value) {}
  },
  GameAddPlayer: {
    email(value) {
      if (!emailRegex.test(value)) return 'Email not valid'
    },
  }
}
