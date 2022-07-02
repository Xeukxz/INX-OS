let mouse, mousedown, deltaLeft, deltaTop, mouseOffsetX, mouseOffsetY, obj, objClass, objParent, expandEl = false,
  focusedWin, currentWin, windows = [], winObject,
  lastWin, offsetLeft = 0,
  newWindow = {},
  resizeLmousedown = false,
  resizeRmousedown = false,
  resizeTmousedown = false,
  resizeBmousedown = false,
  origionalWidth, origionalHeight, closed = 'closed',
  open = 'open',
  programs = {
    cmd: 'closed',
    taskTimer: 'closed',
    fireSim: 'closed',
    gamblingSim: 'closed',
    particleControl: 'closed'

  },
  gravity = false
$(() => {

  $('#bgimg2').css('width', `${window.innerWidth}px`)

  const generateID = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890--"
    let id = []
    for (let i = 0; i < 20; i++) id.push(chars[Math.floor(Math.random() * chars.length)])
    return id.join('')
  }

  function fall(element) {
    setTimeout(() => {
      element = $(element)

      let bottom = window.innerHeight - element.height() - $(element[0].parentElement)[0].offsetTop - 40
      console.log(window.innerHeight, $(element[0].parentElement)[0].offsetTop, element, bottom)
      let acceleration = 0.05
      console.log(bottom)
      let drop = setInterval(() => {
        acceleration += 0.05
        if (element[0].offsetTop < bottom) $(element).css('top', `${element[0].offsetTop + acceleration}`)
        else {
          $(element).css('top', `${bottom}px`)
          clearInterval(drop)
        }
      }, 1);
    }, 1);
  }


  let rectNo = 0

  function removeWindow(win) {
    win.remove()
  }

  function addWindow(name) {
    let win = getWinByName(name)
    if (win) {
      if (win.open) return win
      win.createHTML()
      win.open = true
    } else {
      id = generateID()
      win = new Window(name, id)
      win.open = true
      windows.push(win)
      windows.push(win)
      win.bringToTop($(`#${window.id}`)[0])
      newWindow = {
        name: name,
        id: id
      }
    }
    return win

  }

  addWindow('window')

  function setMousePos(Obj) {
    deltaLeft = $(Obj)[0].offsetLeft
    deltaTop = $(Obj)[0].offsetTop
    mouseOffsetX = mouse.x
    mouseOffsetY = mouse.y
  }

  function getWin(Obj) {
    console.log(Obj)
    let val = Obj
    while ($(val)[0].className != "window") {
      val = $(val)[0].parentElement
      if (!$(val)[0].className) return false
    }
    windows.find(w => w.id == val.id).bringToTop()
    return val
  }

  function getWinByName(name) {
    return windows.find(w => w.name == name)
  }

  $(document).on('click', event => {

    // Open CMD window via TaskBar icon

    if (event.target.id == "cmdIconOverlay") {
      addWindow('cmd')
      $('#cmdIconOverlay').css('background-color', 'rgba(117, 117, 117, 0.349)')
    }
  })

  $(document).on('dblclick', event => {
    switch (event.target.id) {
      case "taskTimerIcon":
        addWindow('Task Timer');
        break;
      case "fireSimIcon":
        addWindow('Fire Sim');
        break;
      case "gamblingSimIcon":
        addWindow('Gambling Sim');
        break;
      case "particleControlIcon":
        addWindow('Particle Control');
        break;
    }
  })

  $(document).on('mousedown', event => {
    offsetLeft = 0
    obj = $(event.target)
    objClass = $(obj)[0].className
    objParent = $(obj)[0].parentElement
    focusedWin = getWin(obj)
    winObject = windows.find(w => w.id == focusedWin.id)
    console.log(focusedWin.offsetLeft, focusedWin.offsetLeft)
    if (obj[0].localName == "body") return
    if (objClass == "topBarOverlay") {
      winObject.lastPos.x = focusedWin.offsetLeft
      winObject.lastPos.y = focusedWin.offsetTop
      mousedown = true
      setMousePos(focusedWin)
    } else if (objClass == "xOverlay") {
      if (focusedWin.children[0].children[0].innerHTML == "cmd") $('#cmdIconOverlay').css('background-color', 'rgba(117, 117, 117, 0)')
      winObject.open = false
      winObject.deleteHTML()
    } else if (objClass == "bsOverlay") {
      let siblings = obj[0].parentNode.children
      console.log(siblings);
      ($(siblings[0]).css('display') == "inline") ? winObject.maximise() : winObject.minimise()
      
    } else if (objClass == "leftExpander") {
      resizeLmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalWidth = $(focusedWin).width()
      mouseOffsetY = mouse.y

    } else if (objClass == "rightExpander") {
      resizeRmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalWidth = $(focusedWin).width()
      mouseOffsetY = mouse.y

    } else if (objClass == "topExpander") {
      resizeTmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalHeight = $(focusedWin).height()
      mouseOffsetY = mouse.y

    } else if (objClass == "bottomExpander") {
      resizeBmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalHeight = $(focusedWin).height()
      mouseOffsetY = mouse.y

    } else if (objClass == "topleftExpander") {
      resizeTmousedown = true
      resizeLmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalHeight = $(focusedWin).height()
      origionalWidth = $(focusedWin).width()
      mouseOffsetY = mouse.y

    } else if (objClass == "toprightExpander") {
      resizeTmousedown = true
      resizeRmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalHeight = $(focusedWin).height()
      origionalWidth = $(focusedWin).width()
      mouseOffsetY = mouse.y

    } else if (objClass == "bottomleftExpander") {
      resizeBmousedown = true
      resizeLmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalHeight = $(focusedWin).height()
      origionalWidth = $(focusedWin).width()
      mouseOffsetY = mouse.y

    } else if (objClass == "bottomrightExpander") {
      resizeBmousedown = true
      resizeRmousedown = true
      deltaLeft = focusedWin.offsetLeft
      deltaTop = focusedWin.offsetTop
      mouseOffsetX = mouse.x
      origionalHeight = $(focusedWin).height()
      origionalWidth = $(focusedWin).width()
      mouseOffsetY = mouse.y
    }

    if (obj[0].classList.value == 'rect' && obj[0].id == `rect${rectNo}`) {
      rectNo++
      $('body').append(`
        <div class="rect" id="rect${rectNo}" style="background-color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})">
      `)
    }
  })

  $(document).on('mouseup', event => {
    if (gravity) fall($(focusedWin))
    mousedown = false
    resizeLmousedown = false
    resizeRmousedown = false
    resizeTmousedown = false
    resizeBmousedown = false

  })

  $(document).on('mousemove', event => {
    mouse = {
      x: event.clientX,
      y: event.clientY
    }
    if (mousedown) {
      if (winObject.fullscreen == true) {
        winObject.minimise()
        $(focusedWin).css('left', `${mouse.x - (winObject.width/2)}px`)
        offsetLeft = mouse.x - (winObject.width / 2)
      }
      if ($(focusedWin).css('top').replace('px', '') < 0) {
        $(focusedWin).css('top', `0px`)
      }
      winObject.reposition(offsetLeft + deltaLeft + mouse.x - mouseOffsetX, deltaTop + mouse.y - mouseOffsetY)
      let wind = winObject
      currentWin = focusedWin
    }
    if (resizeLmousedown) {
      winObject.resizeEW(offsetLeft + deltaLeft + mouse.x - mouseOffsetX, mouseOffsetX + origionalWidth - mouse.x)
      if ($(focusedWin).width() < 200) $(focusedWin).width(200)
      winObject.width = $(focusedWin).width()
      winObject.height = $(focusedWin).height()

    }
    if (resizeRmousedown) {
      winObject.resizeEW(deltaLeft, mouse.x - mouseOffsetX + origionalWidth)
      if ($(focusedWin).width() < 200) $(focusedWin).width(200)
      winObject.width = $(focusedWin).width()
      winObject.height = $(focusedWin).height()

    }
    if (resizeTmousedown) {
      winObject.resizeNS(deltaTop + mouse.y - mouseOffsetY, mouseOffsetY + origionalHeight - mouse.y)
      if ($(focusedWin).height() < 100) $(focusedWin).height(100)
      winObject.width = $(focusedWin).width()
      winObject.height = $(focusedWin).height()

    }
    if (resizeBmousedown) {
      winObject.resizeNS(deltaTop, mouse.y - mouseOffsetY + origionalHeight)
      if ($(focusedWin).height() < 100) $(focusedWin).height(100)
      winObject.width = $(focusedWin).width()
      winObject.height = $(focusedWin).height()
    }
  })

  $(document).on('mouseup', event => {
    if (objClass != "topBarOverlay") return
    if ($(focusedWin).css('top').replace('px', '') == 0) winObject.maximise()
  })
})