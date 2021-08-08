//console.log('cmd.js ✔')

let cmdHistory = [],
  cmdHistoryNo = 0

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
      let cmdText = $('#cmdInput').html(),
        cmdOldText = $('#cmdInput').html()
      while (cmdText.includes('&lt;')) cmdText = cmdText.replace('&lt;', '<')
      while (cmdText.includes('&gt;')) cmdText = cmdText.replace('&gt;', '>')
      console.log(cmdText)
      $(`#cmdContentBox`).append(`<p>> ${cmdText}</p>`)
      $('#cmdInput').html('')
      console.log(cmdHistory, cmdHistory.length, cmdHistory[cmdHistory.length-1], cmdOldText)
      if (cmdHistory[cmdHistory.length-1] != cmdOldText && cmdOldText != "") {
        cmdHistory.push(cmdOldText)
        cmdHistoryNo = cmdHistory.length

      }
      return false
    }
  }
})

$(document).on('keydown', event => {
  console.log(event.keyCode)
  console.log(cmdHistory, cmdHistoryNo)
  if (event.target == $('#cmdInput')[0]) {
    if (event.keyCode == '38') {
      if (cmdHistoryNo <= 0) return
      cmdHistoryNo--
      $('#cmdInput').html(`${cmdHistory[cmdHistoryNo]}`)
      console.log(cmdHistory)
    } else if (event.keyCode == '40') {
      if (cmdHistoryNo < cmdHistory.length - 1) {
        cmdHistoryNo++
        $('#cmdInput').html(`${cmdHistory[cmdHistoryNo]}`)
        console.log(cmdHistory)
      } else {
        $('#cmdInput').html(``)
        cmdHistoryNo = cmdHistory.length
      }
    } else {
      cmdHistoryNo = cmdHistory.length
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