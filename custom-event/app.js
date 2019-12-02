class MyCustomEvent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.addEventListener('click', this.fireClickedEvent)

  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `<button>button</button>`
  }

  fireClickedEvent() {
    const event = new CustomEvent('clicked', { detail: { hoge: 'piyo' } })
    this.dispatchEvent(event)
  }
}

customElements.define('my-custom-event', MyCustomEvent)
