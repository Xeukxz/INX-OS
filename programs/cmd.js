//console.log('cmd.js ✔')

let cmdHistory = []

$(() => {
  $('#cmdIconOverlay').on('click', event => {

    setTimeout(() => {
      console.log(cmdOpen)
      if (!cmdOpen) cmdOpen = true
      else return

      if (newWindow.name == 'cmd') {
        $($(`#${newWindow.id}`)[0].children[1]).append(`
      <div id="cmdContent">
        <div id="cmdContentBox">
        </div>
        <div id="cmdInputBox">
          <p>
            <span id="cmdPrefix">></span>
            <span id="cmdInput" contentEditable='true' spellcheck="false"></span>
          </p>
        </div>
        <div id="cmdStretcher"></div>
      </div>
      `)
        $('#cmdInput').css('width', `calc(100% - ${10+$('#cmdPrefix').width()}px)`)
      }
    }, 1);

  })

/*   setInterval(() => {
    console.log(cmdOpen)
  }, 1000); */

})

$(document).on('keypress', event => {
  if (event.target == $('#cmdInput')[0]) {
    if (event.keyCode == '13') {
      let cmdText = $('#cmdInput').html()
      while (cmdText.includes('&lt;')) cmdText = cmdText.replace('&lt;', '<')
      while (cmdText.includes('&gt;')) cmdText = cmdText.replace('&gt;', '>')
      console.log(cmdText)
      $(`#cmdContentBox`).append(`<p>> ${cmdText}</p>`)
      $('#cmdInput').html('')
      return false
    }
  }
})

$(document).on('click', event => {
  console.log(event.target.id)
  if (event.target.id == 'cmdStretcher') {
    console.log('mogusy')
    $('#cmdInput').focus()
  }
})