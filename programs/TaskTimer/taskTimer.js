console.log('taskTimer.js ✔')

initialised = false

$(() => {

  var ms = 0
  var s = 0
  var m = 0
  var h = 0
  var d = 0
  var time = "0.00"
  var pannelNo = 0
  var editBackup = "Debug"

  var completeNo = 0

  function calltime() {
    let stringMilisec = ms
    let stringSec = s
    let stringMin = m
    let stringHour = h
    if (ms < 10) stringMilisec = '0' + ms
    if (s < 10) stringSec = '0' + s
    if (m < 10) stringMin = '0' + m
    if (h < 10) stringHour = '0' + h
    if (d < 10) stringDay = '0' + d

    time = `${stringHour}:${stringMin}:${stringSec}.${stringMilisec}`

    $('#timerp').html(time)
  }

  $('#taskTimerIcon').on('dblclick', event => {
    setTimeout(() => {
      console.log('ja1')
      console.log(programs.taskTimer)
      if (programs.taskTimer == 'closed') programs.taskTimer = 'open'
      else return
      console.log('ja2')
      console.log($(`#${newWindow.id}`))
      /* $(`#${newWindow.id}`).height(500) */
      $($(`#${newWindow.id}`)[0].children[1]).css('font-family', `Arial, Helvetica, sans-serif`)
      if (newWindow.name == 'Task Timer') {
        $($(`#${newWindow.id}`)[0].children[1]).append(`
              <div id="outerFrame">
                <div id="innerFrame">
                    <div id="placeHolder"></div>
                </div>
                
                <div id="taskiBox">
                    <input type="text" id="taski">
                    <button id="buttonss"></button>
                    <button id="buttonr">Restart</button>
                </div>

                <div id="timer">
                <p id="timerp"></p>
                </div>
                </div>
            `)

        //val length max = 20 chars
        ms = 0
        s = 0
        m = 0
        h = 0
        d = 0
        calltime()
      }

      $('#timerp').html(time)

      // on new task input Enter
      $('#taski').on('keydown', (event) => {
        let value = $('#taski').val()
        console.log(event)
        if (event.keyCode == 13) {
          if (value == "") return
          pannelNo++

          // add new pannel
          $('#innerFrame').append(`
            <div class="pannel" id="pannel-${pannelNo}">
            <p class="pannelTask">${value}</p>
              <button class="buttonEdit">Edit</button>
              </div>
          `)
          //$(`.pannel-${pannelNo}`).css('background-color', `#353535`)

          // clear new task input
          $('#taski').val("")

          // on pannel edit button
          $(`#pannel-${pannelNo} .buttonEdit`).on('click', (event) => {

            let editButton = $(event.target)
            let pannelTask = editButton.parent().find('.pannelTask')
            editBackup = pannelTask.html()
            console.log(editBackup)

            // check if already an input
            if ($(pannelTask).is('input')) {
              $(pannelTask).trigger('keydown', {
                keyCode: 13
              })
              return
            }

            // replace <p> with <input>
            pannelTask.replaceWith(`<input class="pannelTask" value="${pannelTask.html()}"/>`)
            pannelTask.css({
              "border": "none"
            })
            pannelTask = editButton.parent().find('.pannelTask')
            pannelTask.focus()

            // check for Enter and replace <input> with <p>
            $(pannelTask).on('keydown', (event) => {
              if (event.keyCode == 13) {
                pannelTask.replaceWith(`<p class="pannelTask">${pannelTask.val()}</p>`)
              } else if (event.keyCode == 27) {
                pannelTask.replaceWith(`<p class="pannelTask">${editBackup}</p>`)
              }
            })
          })

          //(`<div class="editPannel" id="editPannel-${pannelNo}"></div>`)
          console.log(pannelNo)
          if (pannelNo > 20) {
            let maffs = pannelNo - 20
            let maffs2 = maffs * 22.5
            frameHeight = 494 + maffs2
          } else {
            frameHeight = 494
          }
          /* $('#outerFrame').css('height', `${frameHeight}px`) */
        }
      })



      $(document).on('keydown', (event) => {
        console.log(event.keyCode)
        if (event.target.id == "taski") return
        if (event.keyCode == 222) {
          console.log(completeNo)
          completeNo++
          console.log(`#pannel-${completeNo}`)
          $(`#pannel-${completeNo}`).css('background-color', `rgba(0, 255, 0, 0.85)`)
          $(`#pannel-${completeNo}`).css('color', `black`)
          $(`#pannel-${completeNo} .buttonEdit`).remove()
          $(`#pannel-${completeNo}`).append(`<p class="completeTime">${time}</p>`)
          $(`#pannel-${completeNo}`).css('font-weight', `bold`)
          console.log(completeNo)

        }
      })




      let stop = true
      $('#buttonss').html("Start")

      $('#buttonss').on('click', () => {
        if (stop == true) {
          stop = false
          $('#buttonss').html("Stop")
        } else if (stop == false) {
          stop = true
          $('#buttonss').html("Start")
        }
      })

      $('#buttonr').on('click', () => {
        ms = 0
        s = 0
        m = 0
        h = 0
        d = 0
        time = "0.00"
        calltime()
      })

      var mouseOffsetX = 0
      var mouseOffsetY = 0

      let mouseDownWindowFrame = false
      $('#windowFrame').on('mousedown', (event) => {
        mouseOffsetX = event.clientX - Number($('#outerFrame').css('left').replace('px', ''))
        mouseOffsetY = event.clientY - Number($('#outerFrame').css('top').replace('px', ''))
        mouseDownWindowFrame = true
      })

      $(document).on('mousemove', (event) => {
        if (mouseDownWindowFrame == true) {
          let mouseX = event.clientX - mouseOffsetX
          let mouseY = event.clientY - mouseOffsetY
          $('#outerFrame').css('left', `${mouseX}px`)
          $('#outerFrame').css('top', `${mouseY}px`)
        }

      })

      $(document).on('mouseup', (event) => {
        mouseDownWindowFrame = false
      })

      setInterval(function () {
        if (programs.taskTimer == 'closed') stop = true
        if (stop) return
        ms++
        if (ms >= 100) {
          ms -= 100
          s++
        }

        if (s >= 60) {
          s -= 60
          m++
        }

        if (m >= 60) {
          m -= 60
          h++
        }

        if (h >= 24) {
          h -= 24
          d++
        }

        calltime()
      }, 10);
      $(`#${newWindow.id}`).height(450)
      windows.find(w => w.name = newWindow.name).height = $(`#${newWindow.id}`).height()
    }, 1);
  })
})