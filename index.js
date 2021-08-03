let mouse, mousedown, deltaLeft, deltaTop, mouseOffsetX, mouseOffsetY, obj, objClass, objParent, expandEl = false,
  win, currentWin, windows = [], lastWin, offsetLeft = 0, newWindow = {}
$(() => {

  function generateID() {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890--"
    let id = []
    for (let i = 0; i < 20; i++) id.push(chars[Math.floor(Math.random() * chars.length)])
    return id.join('')
  }

  $('.window').css('left', `${window.innerWidth - 200}px`)
  $('.window').css('top', `${window.innerHeight - 150}px`)

  // later feature:

  /*   function withinAdjustRange(el) {
      console.log(mouse.x, el[0].offsetLeft+el.width()-2, el[0].offsetLeft+el.width()+2)
      if(mouse.x >= el[0].offsetLeft+el.width()-5 && mouse.x <= el[0].offsetLeft+el.width()+5 && mouse.y >= el[0].offsetTop && mouse.y < el[0].offsetTop+el.height()) {
        $('body').css('cursor', 'e-resize')
        expandEl = true
        console.log('ja')
      } else if(mouse.x >= el[0].offsetLeft-5 && mouse.x >= el[0].offsetLeft+5) {

      }
      else {
        $('body').css('cursor', 'default')
      }
    }

    function expandElement(el) {

    } */

  /*   function fall(element) {
      let bottom = window.innerHeight - element.height() - $(element[0].parentElement)[0].offsetTop
      console.log(window.innerHeight, $(element[0].parentElement)[0].offsetTop, element, bottom)
      let acceleration = 0.05
      let drop = setInterval(() => {
        acceleration += 0.05
        if (element[0].offsetTop < bottom) $(element).css('top', `${element[0].offsetTop + acceleration}`)
        else {
          $(element).css('top', `${bottom}px`)
          clearInterval(drop)
        }
      }, 1);
    } */


  let rectNo = 0

  function bringToFront(win) {
    win.parentNode.insertBefore(win, $('#front')[0])
    /*     $('#front')[0].parentNode.insertBefore($('#front')[0], win) */
  }

  function removeWindow(win) {
    win.remove()
  }

  function addWindow(name, id) {
    let window = new Window(name, id)
    windows.push(window)
    window.bringToTop($(`#${window.name}`)[0])
    if(name == "cmd") newWindow = {name: 'cmd', id: id}

  }
  addWindow('window', generateID())

  function setMousePos(Obj) {
    mousedown = true
    deltaLeft = $(Obj)[0].offsetLeft
    deltaTop = $(Obj)[0].offsetTop
    mouseOffsetX = mouse.x
    mouseOffsetY = mouse.y
  }

  function getWin(Obj) {
    let val = Obj
    while ($(val)[0].className != "window") {
      val = $(val)[0].parentElement
    }
    return val
  }

  function getWinId(win) {
    return $(win)[0].id
  }

  $('#addWin').on('click', event => {
    addWindow('window', generateID())
  })

  $(document).on('click', event => {
    if (event.target.id == "cmdIconOverlay") {
      addWindow('cmd', generateID())
    }
  })

  $(document).on('mousedown', event => {
    offsetLeft = 0
    obj = $(event.target)
    objClass = $(obj)[0].className
    objParent = $(obj)[0].parentElement
    win = getWin(obj)
    incClass = windows.find(w => w.name = win.id)
    if (obj[0].localName == "body") return
    if (objClass == "topBarOverlay") {
      windows.find(w => w.name = win.id).lastPos.x = $(win)[0].offsetLeft
      windows.find(w => w.name = win.id).lastPos.y = $(win)[0].offsetTop
      setMousePos(win)
      bringToFront(win)
    } else if (objClass == "xOverlay") {
      removeWindow(win)
    } else if (objClass == "bsOverlay") {
      siblings = obj[0].parentNode.children
      if ($(siblings[0]).css('display') == "inline") {
        windows.find(w => w.name = win.id).maximise()
      } else {
        windows.find(w => w.name = win.id).minimise()

      }
    }

    if (obj[0].classList.value == 'rect' && obj[0].id == `rect${rectNo}`) {
      rectNo++
      $('body').append(`
        <div class="rect" id="rect${rectNo}" style="background-color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})">
      `)
    }
  })

  $(document).on('mouseup', event => {
    mousedown = false

  })
  $(document).on('mousemove', event => {
    mouse = {
      x: event.clientX,
      y: event.clientY
    }
    /* if($(event.target)[0].localName == 'body') return
    else lastElement = $(event.target) */
    //withinAdjustRange(lastElement)
    if (mousedown) {
      if(windows.find(w => w.name = win.id).fullscreen == true) {
        windows.find(w => w.name = win.id).minimise()
        $(win).css('left', `${mouse.x - (windows.find(w => w.name = win.id).width/2)}px`)
        offsetLeft = mouse.x - (windows.find(w => w.name = win.id).width/2)
      }
      if ($(win).css('top').replace('px', '') < 0) {
        $(win).css('top', `0px`)
      }
      windows.find(w => w.name = win.id).reposition(offsetLeft + deltaLeft + mouse.x - mouseOffsetX, deltaTop + mouse.y - mouseOffsetY)
      let wind = windows.find(w => w.name = win.id)
      currentWin = win
    }
  })

  $(document).on('mouseup', event => {
    if(objClass != "topBarOverlay") return
    if ($(win).css('top').replace('px', '') == 0) {
      windows.find(w => w.name = win.id).maximise()
    }
    
  })
})