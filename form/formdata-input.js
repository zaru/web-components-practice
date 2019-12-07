class FormdataInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
    this._form = this.findContainingForm()
    this._form.addEventListener('submit', event => {
      console.log('submit', event.formData)
    })
    this._form.addEventListener('formdata', event => {
      event.formData.append(this._input.name, this._input.value)
      console.log(Array.from(event.formData.entries()))
    })
  }

  render() {
    this._input = document.createElement('input')
    this._input.name = this.inputName
    this.shadowRoot.appendChild(this._input)
  }

  get inputName() {
    return this.getAttribute('name')
  }

  findContainingForm() {
    // ref https://web.dev/more-capable-form-controls/
    const root = this.getRootNode()
    const forms = Array.from(root.querySelectorAll('form'))
    return forms.find((form) => form.contains(this)) || null
  }
}

customElements.define('formdata-input', FormdataInput)
