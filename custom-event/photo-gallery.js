// fetch('./photo-gallery-template.html').then(response => {
//
// })

class PhotoGallery extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(this.template().content.cloneNode(true))
  }

  connectedCallback() {
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', event => {
      this.shadowRoot.querySelector('slot').assignedNodes().forEach(node => {
        console.log(node)
      })
    })
  }

  template() {
    const template = document.createElement('template');
    template.innerHTML = `
<style>
@keyframes slide {
  from {
    transform:translateX(0px);
  }

  to {
    transform:translateX(100px);
  }
}
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
}
::slotted(img.animate) {
  /*animation: 3s slide;*/
}
:host {
  animation: 3s slide;
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
