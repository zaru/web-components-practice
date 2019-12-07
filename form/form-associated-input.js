class FormAssociatedInput extends HTMLElement {
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
    this._input.autofocus = 'autofocus'
    this._input.addEventListener('change', () => { this.setFormValue() })
    this.shadowRoot.appendChild(this._input)
  }

  get value() { return this._input.value }
  set value(v) { this._input.value = v }

  get inputName() {
    return this.getAttribute('name')
  }

  setFormValue() {
    this._internals.setFormValue(this.value, 'hoge/' + this.value)
    // this.internals_.setValidity({customError: true}, 'Value cannot be negative.');
  }

  formStateRestoreCallback(state, mode) {
    if (mode === 'restore') {
      this.value = state
    }
  }
}

customElements.define('form-associated-input', FormAssociatedInput)
