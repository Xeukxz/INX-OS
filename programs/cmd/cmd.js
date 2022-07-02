console.log('cmd.js ✔')

let cmdHistory = [],
  cmdHistoryNo = 0

$(() => {

  $('#cmdIconOverlay').on('click', event => {
    console.log(programs.cmd)
    if (programs.cmd != 'closed') return

    setTimeout(() => {
      programs.cmd = true

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

    setTimeout(() => {

      $(`#cmdContentBox`).append(`<p><span>> Use command <span style="text-decoration: underline">cmds</span> for command info</span></p>`)
    }, 1);

  })

  /*   setInterval(() => {
      console.log(cmdOpen)
    }, 1000); */

})

function fall(element) {
  setTimeout(() => {

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

$(document).on('keypress', event => {
  if (event.target == $('#cmdInput')[0]) {
    if (event.keyCode == '13') {
      let cmdText = $('#cmdInput').html(),
        cmdOldText = $('#cmdInput').html()


      cmdText = cmdText.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
      console.log(cmdText)
      $(`#cmdContentBox`).append(`<p>> ${cmdText}</p>`)
      $('#cmdInput').html('')
      console.log(cmdHistory, cmdHistory.length, cmdHistory[cmdHistory.length - 1], cmdOldText)
      if (cmdHistory[cmdHistory.length - 1] != cmdOldText && cmdOldText != "") {
        cmdHistory.push(cmdOldText)
        cmdHistoryNo = cmdHistory.length

      }

      console.log(cmdText)

      if (cmdText == `desktop.background.switch()` || cmdText == `desktop.bgswitch()`) {
        console.log('wiwi')
        console.log()
        if ($('#bgimg2').css('display') == 'none') {
          $('#bgimg2').css('display', 'block')
          $('#bgimg1').css('display', 'none')
        } else if ($('#bgimg1').css('display') == 'none') {
          $('#bgimg1').css('display', 'block')
          $('#bgimg2').css('display', 'none')
        }

      } else if (cmdText == `desktop.toggleGravity()` || cmdText == `desktop.gravity()`) {
        console.log(windows)
        for (let i in windows) {
          fall($(`#${windows[i].id}`))
        }
        if (gravity) gravity = false
        else gravity = true
      } else if (['cmds','commands','help','?'].includes(cmdText)) {
        $(`#cmdContentBox`).append(`<p>> Commands:</p>`)
        $(`#cmdContentBox`).append(`<p>> - desktop.background.switch()</p>`)
        $(`#cmdContentBox`).append(`<p>> - desktop.toggleGravity()</p>`)

      }


      return false
    }
  }
})

$(document).on('keydown', event => {
  /* console.log(event.keyCode)
  console.log(cmdHistory, cmdHistoryNo) */
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
  console.log('pp')
  console.log(event.target.id)
  if (event.target.id == 'cmdStretcher') {
    console.log('mogusy')
    $('#cmdInput').focus()
  }
})