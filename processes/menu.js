console.log('menu.js ✔')

menuOpen = false, searching = false

$(() => {

  $(document).on('keypress', event => {
    if (event.target.id != "menuSearchTyping") return
    if(event.keyCode == '13') { 
      $('#menuSearchTyping').html('')
      $(`#menuSearchFillertext`).css('visibility', 'visible')
      return false
    }

  })

  $(document).on('keydown', event => {
    setTimeout(() => {

      console.log(event.keyCode, menuOpen)

      if (event.keyCode == '27') return

      if (event.target.id == "menuSearchTyping") {
        if (!searching) {
          if ($(`#menuSearchTyping`).html() == "") return
          searching = true
          $(`#menuSearchFillertext`).css('visibility', 'hidden')
        } else {
          if ($(`#menuSearchTyping`).html() == "") {

            searching = false
            $(`#menuSearchFillertext`).css('visibility', 'visible')
          }
        }
      }

      if (!menuOpen) {
        if (event.keyCode == 27) {
          menuOpen = true
          $('#menu').css('visibility', 'visible')
        }
      } else {
        if (event.keyCode == 27) {
          $('#menu').css('visibility', 'hidden')
          menuOpen = false
        } else {
          if (!searching) {

          }
        }
      }
    }, 1);
  })

  $('#menuIconOverlay').on('click', event => {
    console.log(event)
  })
})