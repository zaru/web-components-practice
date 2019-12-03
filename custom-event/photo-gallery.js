// fetch('./photo-gallery-template.html').then(response => {
//
// })

class PhotoGallery extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation)
        if (mutation.addedNodes.length) {
          console.info('Node added: ', mutation.addedNodes[0])
        }
      })
    })

    observer.observe(this.shadowRoot, {childList: true})

    this.shadowRoot.appendChild(this.template().content.cloneNode(true))
  }

  connectedCallback() {
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
      console.log('slot change')
      this.shadowRoot.querySelectorAll('img').forEach(element => {
        element.classList.add('animate')
      })
    })
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded')

    })
  }

  template() {
    const template = document.createElement('template');
    template.innerHTML = `
<style>
.gallery {
  width: 350px;
  height: 100px;
  overflow: hidden;
  display: flex;
}
::slotted(img) {
  width: 100px;
  height: 100px;
  object-fit: cover;
  transition-duration:10s;
  transition-timing-function:ease-out;
  transform:translateX(0px);
}
::slotted(img.animate) {
  transform:translateX(100px);
}
</style>
<div class="gallery">
  <slot name="photos"></slot>
</div>
`
    return template
  }


}

customElements.define('photo-gallery', PhotoGallery)
