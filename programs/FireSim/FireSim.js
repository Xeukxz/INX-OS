console.log('FireSim.js ✔')

$(() => {
  loadNodes = () => {
    redflame = {}
    for (let i = 0; i <= nodeCount; i++) {
      if (i == nodeCount) redFlame['point' + i] = [(nodeCount * 10 * flameSize) / nodeCount * i, 0]
      else redFlame['point' + i] = [(nodeCount * 10 * flameSize) / nodeCount * i, i]
      orangeFlame['point' + i] = [(nodeCount * 10 * flameSize) / nodeCount * i, 0]
      yellowFlame['point' + i] = [(nodeCount * 10 * flameSize) / nodeCount * i, 0]
    }
  }
  let nodeCount = 5
  let flameSize = 1
  let fill = true

  let redFlame = {}

  let orangeFlame = {}

  let yellowFlame = {}



  $('#fireSimIcon').on('dblclick', event => {
    setTimeout(() => {
      if (programs.fireSim != 'closed') return
      programs.fireSim = 'open'

      windowContent = $(`#${newWindow.id}`)[0].children[1]

      if (newWindow.name == 'Fire Sim')
        $(windowContent).append(`
        <canvas id="flameCanvas"></canvas>
        `)

      flameCanvas.width = $(windowContent).width();
      flameCanvas.height = $(windowContent).height();
      var c = document.getElementById("flameCanvas");
      var ctx = c.getContext("2d");

      let wDim = {
        width: $(windowContent).width(),
        height: $(windowContent).height()
      }

      let base = {
        x: Math.floor($(windowContent).width() / 2),
        y: Math.floor($(windowContent).height())
      }

      function drawBase() {
        ctx.strokeStyle = "white"
        ctx.moveTo(base.x - ((nodeCount * (5)) * flameSize), base.y)
        ctx.lineTo(base.x + ((nodeCount * (5)) * flameSize), base.y)
        ctx.stroke()
      }

      function rp(object, no, axis) { //Read Points
        if (axis == "x") return base.x - ((nodeCount * (5)) * flameSize) + Object.values(object)[no - 1][0]
        else return base.y - Object.values(object)[no - 1][1]
      }

      function adjustEnds() {
        if (Object.values(redFlame)[1][1] > 15) {
          let lowerFlame = setInterval(() => {
            Object.values(redFlame)[1][1] -= 1
            if (Object.values(redFlame)[1][1] < 5) clearInterval(lowerFlame)
          }, 10);
        } else if (Object.values(redFlame)[Object.values(redFlame).length - 2][1] > 15) {
          let lowerFlame2 = setInterval(() => {
            Object.values(redFlame)[Object.values(redFlame).length - 2][1] -= 1
            if (Object.values(redFlame)[Object.values(redFlame).length - 2][1] < 5) clearInterval(lowerFlame2)
          }, 10);
        }
}



      function plotPoints(obj) {
        if (obj == redFlame) {
          ctx.strokeStyle = 'red'
          ctx.fillStyle = 'red'
        } else if (obj == orangeFlame) {
          ctx.strokeStyle = 'orange'
          ctx.fillStyle = 'orange'
        } else if (obj == yellowFlame) {
          ctx.strokeStyle = 'yellow'
          ctx.fillStyle = 'yellow'
        }
        ctx.moveTo(rp(obj, 1, "x"), rp(obj, 1, "y"))
        for (let i = 2; i <= Object.values(obj).length; i++) {
          ctx.lineTo(rp(obj, i, "x"), rp(obj, i, "y"))
        }
        ctx.stroke()
        if (fill) ctx.fill()
      }

      function raisePoints(obj) {
        if (obj == redFlame) {
          ctx.moveTo(rp(obj, 1, "x"), rp(obj, 1, "y"))
          for (let i = 1; i < Object.values(obj).length - 1; i++) {
            Object.values(obj)[i][1] += Math.round(Math.random() * 2) * flameSize
          }
        } else if (obj == orangeFlame) {
          for (let i = 1; i < Object.values(obj).length - 1; i++) {
            Object.values(obj)[i][1] = (Object.values(redFlame)[i][1] * 2) + (nodeCount * (3)) * flameSize
          }
        } else if (obj == yellowFlame) {
          for (let i = 1; i < Object.values(obj).length - 1; i++) {
            Object.values(obj)[i][1] = (Object.values(redFlame)[i][1] * 3) + (nodeCount * (7)) * flameSize
          }
        }
      }

      function highestPoint(obj) {
        let highest = 0
        for (let i = 2; i < Object.values(obj).length - 2; i++) {
          if (Object.values(obj)[highest][1] < Object.values(obj)[i][1]) highest = i
          /* console.log(highest) */
        }
        if (Object.values(obj)[highest][1] > 30 * flameSize) {

          let lowerFlame = setInterval(() => {
            Object.values(obj)[highest][1] -= 2 * flameSize
            /* console.log(redFlame)
            console.log(Object.values(obj)[highest - 1]) */
            if (Object.values(obj)[highest][1] <= (Object.values(obj)[highest + 1][1] + Object.values(obj)[highest - 1][1]) / 4) clearInterval(lowerFlame)
          }, 10);
          return
        }
        Object.values(obj)[highest][1] += Math.floor(Math.random() * 2) + 2
      }

      loadNodes()

      setInterval(() => {
        console.log($(windowContent).width(), wDim.width)
        if (wDim.width != $(windowContent).width() || wDim.height != $(windowContent).height()) {
          wDim = {
            width: $(windowContent).width(),
            height: $(windowContent).height()
          }
          base.x = Math.floor(wDim.width / 2)
          base.y = Math.floor(wDim.height)
          flameCanvas.width = wDim.width
          flameCanvas.height = wDim.height
        }
        ctx.clearRect(0, 0, $(windowContent).width(), $(windowContent).height())
        ctx.beginPath()
        drawBase()
        highestPoint(redFlame)
        ctx.beginPath()
        plotPoints(yellowFlame)
        raisePoints(yellowFlame)
        ctx.beginPath()
        plotPoints(orangeFlame)
        raisePoints(orangeFlame)
        ctx.beginPath()
        raisePoints(redFlame)
        plotPoints(redFlame)
        adjustEnds()
      }, 30);
    }, 1);
  })
})