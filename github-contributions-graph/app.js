class GitHubContributionsGraph extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.fetchContributionsPage()
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(attr, oldValue, newValue) {
  }

  get userId() {
    return this.getAttribute('user')
  }

  fetchContributionsPage() {
    // TODO: CORS あったわ… proxy 作るの面倒だし微妙だな
    const url = `https://github.com/users/${this.userId}/contributions`
    fetch(url, {
      credentials: 'include'
    }).then(response => {
      console.log(response)
    })
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background: aliceblue;
          border-radius: 3px;
          padding: 20px;
        }
      </style>
      <div>${this.userId}</div>
      `
  }
}

customElements.define('github-contributions-graph', GitHubContributionsGraph);
