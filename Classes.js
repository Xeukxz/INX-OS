let z_index = 1
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
    this.open = false
    this.createHTML()
  }
  createHTML() {
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
        <div class="topleftExpander"></div>
        <div class="toprightExpander"></div>
        <div class="bottomleftExpander"></div>
        <div class="bottomrightExpander"></div>
      </div>
    `)
    $(`#${this.id}`).css('left', `${window.innerWidth/2 - ($('.window').width()/2)}px`)
    $(`#${this.id}`).css('top', `${window.innerHeight/2 - ($('.window').height()/2)}px`)

  }
  deleteHTML() {
    $(`#${this.id}`).remove()
  }

  bringToTop() {
    //$(`#${this.id}`)[0].parentNode.insertBefore($(`#${this.id}`)[0], $('#front')[0])
    $(`#${this.id}`).css(`z-index`, z_index)
    $(`#taskBar`).css(`z-index`, z_index+1)
    z_index++
    console.log(z_index)
  }
  maximise(val) {
    this.lastPos.x = $(`#${this.id}`)[0].offsetLeft
    this.lastPos.y = $(`#${this.id}`)[0].offsetTop
    this.element.css('width', `100%`)
    this.element.css('height', `calc(100% - 40px)`)
    this.element.css('left', `0px`)
    this.element.css('top', `0px`)
    this.element.css('transform', `translate(0px, 0px)`)
    $(this.element[0].children[0].children[2].children[0]).css('display', 'none')
    $(this.element[0].children[0].children[2].children[1]).css('display', 'inline')
    this.fullscreen = true
  }


  minimise() {
    this.element.css('width', `${this.width}px`)
    this.element.css('height', `${this.height}px`)
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
    this.element.css('left', `${x}px`)
    this.element.css('width', `${xx}px`)
  }
  resizeNS(y, yy) {
    this.element.css('top', `${y}px`)
    this.element.css('height', `${yy}px`)
  }

  get element() {
    return $(`#${this.id}`)
  }

}