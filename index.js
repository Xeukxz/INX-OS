$(() => {
  let mouse, mousedown, deltaLeft, deltaTop, mouseOffsetX, mouseOffsetY, obj, expandEl = false

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

  function fall(element) {
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
  }
  let rectNo = 0

  $(document).on('mousedown', event => {
    obj = $(event.target)
    if (obj[0].localName == "body") return
    console.log(obj[0].id, `rect${rectNo}`)
    if (obj[0].classList.value == 'rect' && obj[0].id == `rect${rectNo}`) {
      rectNo++
      $('body').append(`
        <div class="rect" id="rect${rectNo}" style="background-color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})">
      `)
    }
    console.log(obj[0].classList.value)
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
    mouse = {
      x: event.clientX,
      y: event.clientY
    }
    console.log($(event.target)[0].localName)
    /* if($(event.target)[0].localName == 'body') return
    else lastElement = $(event.target) */
    //withinAdjustRange(lastElement)
    if (mousedown) {
      $(obj).css('top', `${deltaTop + mouse.y - mouseOffsetY}px`)
      $(obj).css('left', `${deltaLeft + mouse.x - mouseOffsetX}px`)
    }
  })
})