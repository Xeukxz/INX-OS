$(() => {
  /* $('#gamblingGraph').height($('#stats').height()-$('#options').height()) */
  /*   $('#log').height($('#stats').height()-$('#options').height()) */

  $('#gamblingSimIcon').on('dblclick', event => {
    setTimeout(() => {
      console.log('ja1')
      console.log(programs.gamblingSim)
      if (programs.gamblingSim == 'closed') programs.gamblingSim = 'open'
      else return
      console.log('ja2')
      console.log($(`#${newWindow.id}`))
      /* $(`#${newWindow.id}`).height(500) */
      windowContent = $(`#${newWindow.id}`)[0].children[1]
      $($(`#${newWindow.id}`)[0].children[1]).css('font-family', `Arial, Helvetica, sans-serif`)
      if (newWindow.name == 'Gambling Sim') {
        $($(`#${newWindow.id}`)[0].children[1]).append(`
          <div id="GSBody">
            <div id="modesPopup">
              <p style="margin: 20px;">Select Mode</p>
              <div class="split" style="height: 4px"></div>
              <div id="modes">
                <p><span id="mode-Default">Default</span></p>
                <p><span id="mode-QuickRun">Quick Run</span></p>
                <p><span id="mode-MultipleIterations">Multiple Iterations</span></p>
                <p><span id="mode-Averages">Averages</span></p>
                <p><span id="mode-Custom">Custom</span></p>
          
              </div>
            </div>
            <div id="roundingPopup">
              <p style="margin: 20px;">Select A Rounding Value</p>
              <div class="split" style="height: 4px"></div>
              <br>
              <div id="roundingVals">
                <p><span id="round0">0</span><span id="round1">1</span></p>
                <p><span id="round2">2</span><span id="round3">3</span></p>
                <p><span id="round4">4</span><span id="round5">5</span></p>
              </div>
              <span id="closeRounding">Exit</span>
            </div>
            <div id="stats">
              <div id="options">
                <div id="option-run" class="option"><span
                    style="position:relative;float:left;left:50%;top:50%;transform:translate(-50%, -50%);padding:20px;">Run
                    Simulation</span></div>
                <div id="option-color" class="option"><span
                    style="position:relative;float:left;left:50%;top:50%;transform:translate(-50%, -50%);padding:20px;">Toggle
                    Profit<br>Colors</span></div>
                <div id="option-round" class="option"><span
                    style="position:relative;float:left;left:50%;top:50%;transform:translate(-50%, -50%);padding:20px;">Set
                    Rounding</span></div>
                <div id="option-modes" class="option"><span
                    style="position:relative;float:left;left:50%;top:50%;transform:translate(-50%, -50%);padding:20px;">Change
                    Mode</span></div>
                <div id="option-modeSettings" class="option"><span
                    style="position:relative;float:left;left:50%;top:50%;transform:translate(-50%, -50%);padding:20px;">Mode
                    Settings</span></div>
                <div id="option-info" class="option"><span
                    style="position:relative;float:left;left:50%;top:50%;transform:translate(-50%, -50%);padding:20px;">Information</span>
                </div>
              </div>
          
              <div class="split" style="height: 4px;"></div>
              <canvas id="gamblingGraph"></canvas>
              <div class="split" id="statsplit" style="width: 4px;float: left;height: calc(100% - 54px);"></div>
              <div id="log">
                <!--     <p id="logValue">
                <span class="logValueVal">
                  Bal: 100
                </span>
                <span class="logValueVal">
                  Bet: 2
                </span>
                <span class="logValueVal">
                  Profit: 0
                </span>
              </p> -->
              </div>
              <div class="split" style="height: 4px;float: left; width: 100%"></div>
              <br>
              <div id="msgContainer">
                <div id="message"></div>
              </div>
            </div>
          </div>
          `)

        //val length max = 20 chars
      }

      console.log($('#gamblingGraph').width(), $('#gamblingGraph').height())
      $('#gamblingGraph').height($('#gamblingGraph').width())
      $('#log').height($('#gamblingGraph').width())
      $('#statsplit').height($('#gamblingGraph').width())
      gamblingGraph.width = $('#gamblingGraph').width();
      gamblingGraph.height = $('#gamblingGraph').height();
      var c = document.getElementById("gamblingGraph");
      var ctx = c.getContext("2d");
      let profitColors = 1,
        roundingExponent = 2,
        roundingWindowClosed = true,
        modesWindowClosed = true,
        mode = 'Default'

      function displayAxis() {
        ctx.strokeStyle = 'black'
        ctx.beginPath()
        ctx.moveTo(18, 18)
        ctx.lineTo(18, gamblingGraph.height - 18)
        ctx.lineTo(gamblingGraph.width - 20, gamblingGraph.height - 18)
        ctx.lineWidth = 3
        ctx.stroke()
      }


      $(windowContent).css("font-size", `${$('#option-run').width()/8}px`)


      $(window).resize(function () {
        $('#gamblingGraph').height($('#gamblingGraph').width())
        $('#log').height($('#gamblingGraph').width())
        $('#statsplit').height($('#gamblingGraph').width())
        gamblingGraph.width = $('#gamblingGraph').width();
        gamblingGraph.height = $('#gamblingGraph').height();
        $(windowContent).css("font-size", `${$('#option-run').width()/8}px`)
        $('#roundingPopup').css('width', `${$('#stats').width()/2}`)
        $('#roundingPopup').css('height', `${$('#stats').height()/2}`)

      });


      function plotPoints(val, /*  val2, */ limit) {

        ctx.clearRect(0, 0, gamblingGraph.width, gamblingGraph.height)

        ctx.beginPath()
        ctx.moveTo(20, gamblingGraph.height - 20)

        /* console.log(val.length) */
        for (let i = 0; i < val.length; i++) {
          /* console.log([
            [i], val[i], val[i] / limit, val[i] / limit * 100
          ]) */
          let y = val[i] / limit * 100
          let x = (gamblingGraph.width - 42) / (val.length - 1) * i

          ctx.lineTo(20 + x, (gamblingGraph.height - 20) - ((gamblingGraph.height - 40) * y / 100))
          /* console.log([y, x]) */

        }
        ctx.lineTo(gamblingGraph.width - 20, gamblingGraph.height - 20)
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = '#00aeff'
        ctx.fill()
      }

      let wallet = 0,
        loopy = false

      function quickBet() {
        $('#log').html("")

        let bal = 100,
          bet = 0,
          wins = 0,
          losses = 0,
          wlr = 0,
          betcount = 0,
          bals = [],
          highest = 100,
          loseStreak = 0,
          lastbal = 100,
          wlc = 'white'

        while (bal > 0) {
          answer = Math.floor(Math.random() * 2) + 1
          betcount++
          lastbal = bal
          bals.push(bal)
          bal -= bet
          if (answer == 1) {
            wlc = 'lime'
            lastbal -= bet
            wins++
            bal += bet * 2
            bet = bal * 0.02
          } else {
            wlc = 'red'
            bet *= 3
          }

          bal = Math.round(bal * (10 ** roundingExponent)) / 10 ** roundingExponent

          bet = Math.round(bet * (10 ** roundingExponent)) / 10 ** roundingExponent

          profit = bal - lastbal

          profit = Math.round(profit * (10 ** roundingExponent)) / 10 ** roundingExponent

          /*       if (bet != 0) $('#log').append(`
                <p id="logValue" style="color:${wlc}">
                  <span class="betCountVal" style="width:60px;padding-right:10px;text-align:center;">${betcount}</span>
                  <span class="logValueVal">
                    Bal: ${bal}
                  </span>
                  <span class="logValueVal">
                    Bet: ${bet}
                  </span>
                  <span id="profitValue" class="profitValue logValueVal">
                    Profit: ${profit}
                  </span>
                </p>
                `)
                else betcount-- */

          if (bal > highest) highest = bal

          if (bal <= 0) {
            bals.push(bal)
            $('#log').append(`
          <p id="logValue">
            <span id="highestVal" class="logValueVal">
              Highest Bal: ${highest}
            </span>
          </p>
      `)
            setProfitColors()
          }


          /* console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`) */
          if (bet != 0) plotPoints(bals, highest)
          displayAxis()
          //var element = document.getElementById("yourDivID");
          $('#log')[0].scrollTop = $('#log')[0].scrollHeight;

        }
        if (bet != 0) plotPoints(bals, highest)
        displayAxis()
        let data = {
          highest: highest,
          betcount: betcount,
          bals: bals
        }
        return data
      }

      function slowBet() {

        $('#log').html("")

        let bal = 100,
          bet = 0,
          wins = 0,
          losses = 0,
          wlr = 0,
          betcount = 0,
          bals = [],
          highest = 100,
          loseStreak = 0,
          lastbal = 100,
          wlc = 'white'

        let slowbetloop = setInterval(() => {
          answer = Math.floor(Math.random() * 2) + 1
          betcount++
          lastbal = bal

          bals.push(bal)

          /*  if(bet != 0) bet = bal * 0.02 */

          bal -= bet
          plotPoints(bals, highest)

          if (answer == 1) {
            wlc = 'lime'
            lastbal -= bet
            loseStreak = 0
            wins++
            bal += bet * 2

            /*         if (bal > 200) {
                      wallet += bal - 100
                      bal = 100
                      loopy = false
                      clearInterval(slowbetloop)
                    } */

            bet = bal * 0.02
            /* bal = Math.round(bal)
            bet = Math.round(bet) */
            /* bal -= bet */
            wlr = wins / losses
            console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`)
          } else {
            wlc = 'red'
            console.log(lastbal, bal, lastbal - bal)
            losses++
            /* if (loseStreak > 0) bet *= loseStreak / 100
            else  */
            bet *= 3
            loseStreak++
            console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}, ${wallet}`)
          }

          bal *= 10 ** roundingExponent
          bal = Math.round(bal)
          bal /= 10 ** roundingExponent

          bet *= 10 ** roundingExponent
          bet = Math.round(bet)
          bet /= 10 ** roundingExponent

          profit = bal - lastbal

          profit *= 10 ** roundingExponent
          profit = Math.round(profit)
          profit /= 10 ** roundingExponent

          console.log(lastbal, bal, lastbal - bal)

          if (bet != 0) $('#log').append(`
      <p id="logValue" style="color:${wlc}">
        <span class="betCountVal" style="width:60px;padding-right:10px;text-align:center;">${betcount}</span>
        <span class="logValueVal">
          Bal: ${bal}
        </span>
        <span class="logValueVal">
          Bet: ${bet}
        </span>
        <span id="profitValue" class="profitValue logValueVal">
          Profit: ${profit}
        </span>
      </p>
      `)
          else betcount--



          if (bal > highest) highest = bal

          if (bal <= 0) {
            bals.push(bal)
            clearInterval(slowbetloop)
            $('#log').append(`
          <p id="logValue">
            <span id="highestVal" class="logValueVal">
              Highest Bal: ${highest}
            </span>
          </p>
      `)
            setProfitColors()
          }

          /* console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`) */
          if (bet != 0) plotPoints(bals, highest)
          displayAxis()
          //var element = document.getElementById("yourDivID");
          $('#log')[0].scrollTop = $('#log')[0].scrollHeight;

        }, 1);
        console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`)
        if (bet != 0) plotPoints(bals, highest)
        displayAxis()
      }

      function sexyData() {

      }
      /*   setInterval(() => {
          while (!loopy) {
            slowBet()
            loopy = true
          }
        }, 100); */

      function setProfitColors() {
        if (profitColors == 0) {
          $('.logValueVal').css('color', 'white')
          $('.profitValue').css('color', 'white')
          $('#highestVal').css('color', 'white')
          $('.betCountVal').css('color', 'white')
        } else if (profitColors == 1) {
          $('.logValueVal').css('color', 'white')
          $('#highestVal').css('color', 'lime')
          $('.betCountVal').css('color', 'white')
          $('.profitValue').css('color', 'inherit')
        } else {
          $('.logValueVal').css('color', 'inherit')
          $('.profitValue').css('color', 'inherit')
          $('#highestVal').css('color', 'lime')
          $('.betCountVal').css('color', 'inherit')
        }
        console.log(profitColors)

      }

      $('#option-run').on('click', event => {
        console.log(mode)
        if (mode == 'Default') slowBet()
        else if (mode == 'QuickRun') {
          quickBet()
          $('#log').append(`
      <p style="text-align:center;">
        <span style="color:red">
          Logs removed for performance
        </span>
      </p>`)
        } else if (mode == 'MultipleIterations') {
          let iterations = []
          let highestIteration = 0
          let RunIterations = setInterval(() => {
            let iteration = quickBet().highest
            if (iteration > highestIteration) highestIteration = iteration
            iterations.push(iteration)
            plotPoints(iterations, highestIteration)
            displayAxis()
            if (iterations.length > 1000) {
              clearInterval(RunIterations)
              $('#log').html("")
              for (let i in iterations) {
                $('#log').append(`
          <p id="logValue">
            <span class="logValueVal" style="color:lime">
              Bal: ${iterations[i]}
            </span>
          </p>`)
              }
              $('#log').append(`
        <p style="text-align:center;">
          <span style="color:lime">
            Highest: ${highestIteration}
          </span>
        </p>`)
              $('#log')[0].scrollTop = $('#log')[0].scrollHeight;
            }
          }, 1);
        } else if (mode == 'Averages') {
          let betcounts = []
          let averages = []
          let average = 0
          let highestAverage = 0
          let highestBetCount = 0
          let runAverages = setInterval(() => {
            let betcount = quickBet().betcount
            betcounts.push(betcount)
            let average = 0
            for (let i in betcounts) {
              average += betcounts[i]
            }
            average /= betcounts.length
            if (betcount > highestBetCount) highestBetCount = betcount
            if (average > highestAverage) highestAverage = average
            averages.push(average)
            plotPoints(averages, highestAverage)
            displayAxis()
            if (averages.length > 1000) {
              clearInterval(runAverages)
              $('#log').html("")
              for (let i in averages) {
                $('#log').append(`
          <p id="logValue">
          <span class="logValueVal" style="color:lime">
            Average: ${averages[i]}
          </span>
          <span class="logValueVal" style="color:lime">
            betcount: ${betcounts[i]}
          </span>
          </p>`)
              }
              $('#log').append(`
        <p style="text-align:center;">
          <span style="color:lime">
            Highest Betcount: ${highestBetCount}
          </span>
        </p>`)
              $('#log')[0].scrollTop = $('#log')[0].scrollHeight;
            }

          }, 1);
        } else if (mode = 'Custom') {

        }

      })
      $('#option-color').on('click', event => {
        profitColors++
        if (profitColors > 2) profitColors = 0
        setProfitColors()
      })

      function sendMessage(msg) {
        $('#message').html(msg)
        setTimeout(() => {
          $('#message').html("")
        }, 5000);
      }

      function changeRounding(val) {
        $('#roundingPopup').css('display', 'none')
        roundingWindowClosed = true
        roundingExponent = val
        sendMessage(`Rounding has been changed to ${roundingExponent} decimal places, run the simulation again for its effect to take place`)
      }

      $('#round0').on('click', event => {
        changeRounding(0)
      })
      $('#round1').on('click', event => {
        changeRounding(1)
      })
      $('#round2').on('click', event => {
        changeRounding(2)
      })
      $('#round3').on('click', event => {
        changeRounding(3)
      })
      $('#round4').on('click', event => {
        changeRounding(4)
      })
      $('#round5').on('click', event => {
        changeRounding(5)
      })
      $('#closeRounding').on('click', event => {
        $('#roundingPopup').css('display', 'none')
        roundingWindowClosed = true
      })
      $('#option-round').on('click', event => {
        if (roundingWindowClosed) {
          $('#roundingPopup').css('display', 'block')
          roundingWindowClosed = false
          $('#modesPopup').css('display', 'none')
          modesWindowClosed = true
        } else {
          $('#roundingPopup').css('display', 'none')
          roundingWindowClosed = true
        }
      })

      $('#option-modes').on('click', event => {
        if (modesWindowClosed) {
          $('#modesPopup').css('display', 'block')
          modesWindowClosed = false
          $('#roundingPopup').css('display', 'none')
          roundingWindowClosed = true
        } else {
          $('#modesPopup').css('display', 'none')
          modesWindowClosed = true
        }
      })

      $('#mode-Default').on('click', event => {
        mode = 'Default'
        sendMessage('Mode set to "Default"')
        $('#modesPopup').css('display', 'none')
        modesWindowClosed = true
      })

      $('#mode-QuickRun').on('click', event => {
        mode = 'QuickRun'
        sendMessage('Mode set to "Quick Run"')
        $('#modesPopup').css('display', 'none')
        modesWindowClosed = true

      })

      $('#mode-MultipleIterations').on('click', event => {
        mode = 'MultipleIterations'
        sendMessage('Mode set to "Multiple Iterations"')
        $('#modesPopup').css('display', 'none')
        modesWindowClosed = true

      })

      $('#mode-Averages').on('click', event => {
        mode = 'Averages'
        sendMessage('Mode set to "Averages"')
        $('#modesPopup').css('display', 'none')
        modesWindowClosed = true

      })

      $('#mode-Custom').on('click', event => {
        mode = 'Custom'
        sendMessage('Mode set to "Custom", Edit Porperties in "Mode Settings"')
        $('#modesPopup').css('display', 'none')
        modesWindowClosed = true

      })

      $('#option-modeSettings').on('click', event => {
        sendMessage('"Mode Settings" Coming Soon')
      })

      $('#option-info').on('click', event => {
        sendMessage('"Information" Coming Soon')
      })

      /* 
        mode-Default
        mode-QuickRun
        mode-MultipleIterations
        mode-Averages
       */






      /*   function singraf() {
          let a = []
          for (let i = 0; i < 2 * Math.PI; i += 0.001) a.push((Math.tan(10*i)+1)/2)
          return a
        }

        console.log(singraf())

        plotPoints(singraf(), 1) */

    }, 1)
  })
})