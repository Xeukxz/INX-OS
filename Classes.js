class Window {
  constructor(name, id) {
    this.name = name
    this.id = id
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
      <div class="window" id="${this.id}">
        <div class="topBar">
          <p class="title">${this.name}</p>
          <div class="xButton">
            <svg height="30" width="30">
              <line x1="9" y1="9" x2="21" y2="21" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="9" y1="21" x2="21" y2="9" style="stroke:rgb(187, 187, 187);stroke-width:2" />
            </svg>
            <div class="xOverlay"></div>
          </div>
          <div class="bsButton">
            <svg class=".max" height="30" width="30">
              <line x1="9" y1="9" x2="9" y2="21" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="8" y1="21" x2="22" y2="21" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="21" y1="21" x2="21" y2="9" style="stroke:rgb(187, 187, 187);stroke-width:2" />
              <line x1="22" y1="9" x2="8" y2="9" style="stroke:rgb(187, 187, 187);stroke-width:2" />
            </svg>
            <svg class=".min" style="display: none" height="30" width="30">
              <line x1="9" y1="21" x2="21" y2="21" style="stroke:rgb(187, 187, 187);stroke-width:2" />
            </svg>
            <div class="bsOverlay"></div>
            </div>
          <div class="topBarOverlay"></div>
        </div>
        <div class="content"></div>
        <div class="leftExpander"></div>
        <div class="rightExpander"></div>
        <div class="topExpander"></div>
        <div class="bottomExpander"></div>
      </div>
    `)
  }
  bringToTop() {
    $(`#${this.id}`)[0].parentNode.insertBefore($(`#${this.id}`)[0], $('#front')[0])
  }
  maximise(val) {
    this.lastPos.x = $(`#${this.name}`)[0].offsetLeft
    this.lastPos.y = $(`#${this.name}`)[0].offsetTop
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

  resizeEW(x, xx) {
    console.log('mama')
    this.element.css('left', `${x}px`)
    this.element.css('width', `${xx}px`)
  }
  resizeNS(y, yy) {
    console.log('mama')
    this.element.css('top', `${y}px`)
    this.element.css('height', `${yy}px`)
  }

  get element() {
    return $(`#${this.name}`)
  }

}