$(() => {
  let mouse, mousedown, deltaLeft, deltaTop, mouseOffsetX, mouseOffsetY, obj

  function fall(element) {
    let bottom = window.innerHeight-element.height()-$(element[0].parentElement)[0].offsetTop
    console.log(window.innerHeight, $(element[0].parentElement)[0].offsetTop, element, bottom)
    let acceleration = 0.05
    let drop = setInterval(() => {
      acceleration += 0.05
      if(element[0].offsetTop < bottom) $(element).css('top', `${element[0].offsetTop + acceleration}`)
      else {
        $(element).css('top', `${bottom}px`)
        clearInterval(drop)
      }
    }, 1);
  }

  $(document).on('mousedown', event => {
    obj = $(event.target)
    if (obj[0].localName == "body") return
    mousedown = true
    deltaLeft = $(event.target)[0].offsetLeft,
    deltaTop = $(event.target)[0].offsetTop,
    mouseOffsetX = mouse.x,
    mouseOffsetY = mouse.y
  })
  $(document).on('mouseup', event => {
    mousedown = false
    fall(obj)
      
  })
  $(document).on('mousemove', event => {
    mouse = {x: event.clientX, y: event.clientY}
    if (mousedown) {
      $(obj).css('top',  `${deltaTop + mouse.y - mouseOffsetY}px`)
      $(obj).css('left', `${deltaLeft + mouse.x - mouseOffsetX}px`)
    }
  })
})