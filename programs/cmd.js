console.log('cmd.js ✔')

let cmdOpen = false

$(() => {
  $('#cmdIconOverlay').on('click', event => {
    if(!cmdOpen) cmdOpen = true
    else return

    setTimeout(() => {

      if (newWindow.name == 'cmd') {
        $($(`#${newWindow.id}`)[0].children[1]).append(`
      <div id="cmdContent">
        <div id="cmdContentBox">
          <p class="cmdLine">> avoondelacaca</p>
        </div>
        <div id="cmdInputBox">
          <p>
            <span id="cmdPrefix">></span>
            <span type="text" id="cmdInput" contentEditable='true' spellcheck="false"></span>
          </p>
        </div>
        <div id="cmdStretcher"></div>
      </div>
      `)
        $('#cmdInput').css('width', `calc(100% - ${10+$('#cmdPrefix').width()}px)`)
      }
    }, 1);

    $(document).on('keypress', event => {
      if (event.target == $('#cmdInput')[0]) {
        if (event.keyCode == '13') {
          $(`#cmdContentBox`).append(`<p>> ${$('#cmdInput').html()}</p>`)
          $('#cmdInput').html('')
          return false
        }
      }
    })

  })

})