class Window {
  constructor(name) {
    this.name = name
    this.width = window.innerWidth / 4
    this.height = window.innerHeight / 3
    this.fullscreen = false
    this.pos = {
      x: 0,
      y: 0
    }
    this.lastPos = {
      x: 0,
      y: 0
    }
    this.createHtml()
  }
  createHtml() {
    $('body').append(`  
      <div class="window" id="${this.name}">
        <div class="topBar">
          <p class="title">Window</p>
          <div class="xButton">
            <svg height="25" width="25">
              <line x1="7" y1="7" x2="18" y2="18" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="7" y1="18" x2="18" y2="7" style="stroke:rgb(187, 187, 187);stroke-width:2" />
            </svg>
            <div class="xOverlay"></div>
          </div>
          <div class="bsButton">
            <svg class=".max" height="25" width="25">
              <line x1="7" y1="7" x2="7" y2="18" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="6" y1="18" x2="19" y2="18" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="18" y1="18" x2="18" y2="7" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="19" y1="7" x2="6" y2="7" style="stroke:rgb(187, 187, 187);stroke-width:2" />
            </svg>
            <svg class=".min" style="display: none" height="25" width="25">
              <line x1="6" y1="18" x2="19" y2="18" style="stroke:rgb(187, 187, 187);stroke-width:2" />
            </svg>
            <div class="bsOverlay"></div>
            </div>
          <div class="topBarOverlay"></div>
        </div>
        <div class="content">
        </div>
      </div>
    `)
  }
  maximise(val) {
    this.lastPos.x = $(`#${this.name}`)[0].offsetLeft
    this.lastPos.y = $(`#${this.name}`)[0].offsetTop
    console.log(this.lastPos)
    this.element.css('width', `100%`)
    this.element.css('height', `100%`)
    this.element.css('left', `0px`)
    this.element.css('top', `0px`)
    this.element.css('transform', `translate(0px, 0px)`)
    $(this.element[0].children[0].children[2].children[0]).css('display', 'none')
    $(this.element[0].children[0].children[2].children[1]).css('display', 'inline')
    this.fullscreen = true
  }


  minimise() {
    this.element.css('width', `${window.innerWidth/4}px`)
    this.element.css('height', `${window.innerHeight/3}px`)
    this.element.css('left', `${this.lastPos.x}px`)
    this.element.css('top', `${this.lastPos.y}px`)
    $(this.element[0].children[0].children[2].children[0]).css('display', 'inline')
    $(this.element[0].children[0].children[2].children[1]).css('display', 'none')
    console.log(this.element)
    this.fullscreen = false
  }

  reposition(x, y) {
    this.element.css('left', `${x}px`)
    if (y < 0) y = 0
    this.element.css('top', `${y}px`)
    this.pos.x = x
    this.pos.y = y
    this.element
  }

  get element() {
    return $(`#${this.name}`)
  }

}