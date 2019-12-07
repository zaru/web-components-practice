class PasswordStrengthChecker extends HTMLElement {
  static formAssociated = true

  constructor() {
    super()
    this._internals = this.attachInternals()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this._input = document.createElement('input')
    this._input.name = this.inputName
    this._input.type = 'password'
    this._input.addEventListener('keyup', () => { this.setFormValue() })
    this._input.addEventListener('keyup', () => { this.checkStrength() })
    this.shadowRoot.appendChild(this._input)

    this._strength = document.createElement('div')
    this.shadowRoot.appendChild(this._strength)
  }

  get value() { return this._input.value }
  set value(v) { this._input.value = v }

  get inputName() {
    return this.getAttribute('name')
  }

  setFormValue() {
    this._internals.setFormValue(this.value)
  }

  checkStrength() {
    const point = this._lengthPoint() + this._characterPoint()
    this._strength.innerText = `strength point: ${point}`
  }

  _lengthPoint() {
    const length = this.value.length
    if (length < 8) {
      return 0
    } else if (length < 16) {
      return 2
    }
    return 4
  }

  _characterPoint() {
    const string = this.value
    let point = 0
    point += string.match(/[a-z]/i) ? 1 : 0
    point += string.match(/[A-Z]/i) ? 1 : 0
    point += string.match(/[0-9]/i) ? 1 : 0
    point += string.match(/[!@#$%^&*()_+|~]/i) ? 1 : 0
    return point
  }
}

customElements.define('password-strength-checker', PasswordStrengthChecker)
