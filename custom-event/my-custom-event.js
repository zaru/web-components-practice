class MyCustomEvent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const button = document.createElement('button')
    // button.addEventListener('click', event => this.fireClickedEvent(event))
    button.addEventListener('click', this.fireClickedEvent)
    button.innerText = 'button'
    this.shadowRoot.appendChild(button)
  }

  fireClickedEvent() {
    const event = new CustomEvent('clicked', { bubbles: true, composed: true, detail: { hoge: 'piyo' } })
    this.dispatchEvent(event)
  }

  hoge() {
    console.log('call hoge() method')
  }
}

customElements.define('my-custom-event', MyCustomEvent)
