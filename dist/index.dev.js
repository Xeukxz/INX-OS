"use strict";

var mouse,
    mousedown,
    deltaLeft,
    deltaTop,
    mouseOffsetX,
    mouseOffsetY,
    obj,
    objClass,
    objParent,
    expandEl = false,
    win,
    currentWin,
    windows = [],
    lastWin,
    offsetLeft = 0,
    newWindow = {},
    resizeLmousedown = false,
    resizeRmousedown = false,
    resizeTmousedown = false,
    resizeBmousedown = false,
    origionalWidth,
    origionalHeight,
    closed = 'closed',
    open = 'open',
    programs = {
  cmd: 'closed',
  taskTimer: 'closed',
  fireSim: 'closed',
  gamblingSim: 'closed',
  particleControl: 'closed'
},
    gravity = false;
$(function () {
  $('#bgimg2').css('width', "".concat(window.innerWidth, "px"));

  var generateID = function generateID() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890--";
    var id = [];

    for (var i = 0; i < 20; i++) {
      id.push(chars[Math.floor(Math.random() * chars.length)]);
    }

    return id.join('');
  };

  function fall(element) {
    setTimeout(function () {
      element = $(element);
      var bottom = window.innerHeight - element.height() - $(element[0].parentElement)[0].offsetTop - 40;
      console.log(window.innerHeight, $(element[0].parentElement)[0].offsetTop, element, bottom);
      var acceleration = 0.05;
      console.log(bottom);
      var drop = setInterval(function () {
        acceleration += 0.05;
        if (element[0].offsetTop < bottom) $(element).css('top', "".concat(element[0].offsetTop + acceleration));else {
          $(element).css('top', "".concat(bottom, "px"));
          clearInterval(drop);
        }
      }, 1);
    }, 1);
  }

  var rectNo = 0;

  function removeWindow(win) {
    win.remove();
  }

  function addWindow(name) {
    var win = getWinByName(name);

    if (win) {
      if (win.open) return win;
      win.createHTML();
      win.open = true;
    } else {
      id = generateID();
      win = new Window(name, id);
      win.open = true;
      windows.push(win);
      windows.push(win);
      win.bringToTop($("#".concat(window.id))[0]);
      newWindow = {
        name: name,
        id: id
      };
    }

    return win;
  }

  addWindow('window');

  function setMousePos(Obj) {
    deltaLeft = $(Obj)[0].offsetLeft;
    deltaTop = $(Obj)[0].offsetTop;
    mouseOffsetX = mouse.x;
    mouseOffsetY = mouse.y;
  }

  function getWin(Obj) {
    console.log(Obj);
    var val = Obj;

    while ($(val)[0].className != "window") {
      val = $(val)[0].parentElement;
      if (!$(val)[0].className) return false;
    }

    windows.find(function (w) {
      return w.id == val.id;
    }).bringToTop();
    return val;
  }

  function getWinByName(name) {
    return windows.find(function (w) {
      return w.name == name;
    });
  }

  $(document).on('click', function (event) {
    // Open CMD window via TaskBar icon
    if (event.target.id == "cmdIconOverlay") {
      win = addWindow('cmd');
      console.log(win);
      $('#cmdIconOverlay').css('background-color', 'rgba(117, 117, 117, 0.349)');
    }
  });
  $(document).on('dblclick', function (event) {
    switch (event.target.id) {
      case "taskTimerIcon":
        addWindow('Task Timer');
        break;

      case "fireSimIcon":
        addWindow('Fire Sim');
        break;

      case "gamblingSimIcon":
        addWindow('Gambling Sim');
        break;

      case "particleControlIcon":
        addWindow('Particle Control');
        break;
    }
  });
  $(document).on('mousedown', function (event) {
    offsetLeft = 0;
    obj = $(event.target);
    objClass = $(obj)[0].className;
    objParent = $(obj)[0].parentElement;
    win = getWin(obj);
    incClass = windows.find(function (w) {
      return w.id == win.id;
    });
    if (obj[0].localName == "body") return;

    if (objClass == "topBarOverlay") {
      windows.find(function (w) {
        return w.id == win.id;
      }).lastPos.x = $(win)[0].offsetLeft;
      windows.find(function (w) {
        return w.id == win.id;
      }).lastPos.y = $(win)[0].offsetTop;
      mousedown = true;
      setMousePos(win);
    } else if (objClass == "xOverlay") {
      if ($(win)[0].children[0].children[0].innerHTML == "cmd") $('#cmdIconOverlay').css('background-color', 'rgba(117, 117, 117, 0)');
      windows.find(function (w) {
        return w.id == win.id;
      }).open = false;
      removeWindow(win);
    } else if (objClass == "bsOverlay") {
      siblings = obj[0].parentNode.children;

      if ($(siblings[0]).css('display') == "inline") {
        windows.find(function (w) {
          return w.id == win.id;
        }).maximise();
      } else {
        windows.find(function (w) {
          return w.id == win.id;
        }).minimise();
      }
    } else if (objClass == "leftExpander") {
      resizeLmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalWidth = $("#".concat(win.id)).width();
      mouseOffsetY = mouse.y;
    } else if (objClass == "rightExpander") {
      resizeRmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalWidth = $("#".concat(win.id)).width();
      mouseOffsetY = mouse.y;
    } else if (objClass == "topExpander") {
      resizeTmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalHeight = $("#".concat(win.id)).height();
      mouseOffsetY = mouse.y;
    } else if (objClass == "bottomExpander") {
      resizeBmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalHeight = $("#".concat(win.id)).height();
      mouseOffsetY = mouse.y;
    } else if (objClass == "topleftExpander") {
      resizeTmousedown = true;
      resizeLmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalHeight = $("#".concat(win.id)).height();
      origionalWidth = $("#".concat(win.id)).width();
      mouseOffsetY = mouse.y;
    } else if (objClass == "toprightExpander") {
      resizeTmousedown = true;
      resizeRmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalHeight = $("#".concat(win.id)).height();
      origionalWidth = $("#".concat(win.id)).width();
      mouseOffsetY = mouse.y;
    } else if (objClass == "bottomleftExpander") {
      resizeBmousedown = true;
      resizeLmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalHeight = $("#".concat(win.id)).height();
      origionalWidth = $("#".concat(win.id)).width();
      mouseOffsetY = mouse.y;
    } else if (objClass == "bottomrightExpander") {
      resizeBmousedown = true;
      resizeRmousedown = true;
      deltaLeft = $(win)[0].offsetLeft;
      deltaTop = $(win)[0].offsetTop;
      mouseOffsetX = mouse.x;
      origionalHeight = $("#".concat(win.id)).height();
      origionalWidth = $("#".concat(win.id)).width();
      mouseOffsetY = mouse.y;
    }

    if (obj[0].classList.value == 'rect' && obj[0].id == "rect".concat(rectNo)) {
      rectNo++;
      $('body').append("\n        <div class=\"rect\" id=\"rect".concat(rectNo, "\" style=\"background-color: rgb(").concat(Math.floor(Math.random() * 255), ", ").concat(Math.floor(Math.random() * 255), ", ").concat(Math.floor(Math.random() * 255), ")\">\n      "));
    }
  });
  $(document).on('mouseup', function (event) {
    if (gravity) fall($(win));
    mousedown = false;
    resizeLmousedown = false;
    resizeRmousedown = false;
    resizeTmousedown = false;
    resizeBmousedown = false;
  });
  $(document).on('mousemove', function (event) {
    mouse = {
      x: event.clientX,
      y: event.clientY
    };

    if (mousedown) {
      if (windows.find(function (w) {
        return w.id == win.id;
      }).fullscreen == true) {
        windows.find(function (w) {
          return w.id == win.id;
        }).minimise();
        $(win).css('left', "".concat(mouse.x - windows.find(function (w) {
          return w.id == win.id;
        }).width / 2, "px"));
        offsetLeft = mouse.x - windows.find(function (w) {
          return w.id == win.id;
        }).width / 2;
      }

      if ($(win).css('top').replace('px', '') < 0) {
        $(win).css('top', "0px");
      }

      windows.find(function (w) {
        return w.id == win.id;
      }).reposition(offsetLeft + deltaLeft + mouse.x - mouseOffsetX, deltaTop + mouse.y - mouseOffsetY);
      var wind = windows.find(function (w) {
        return w.id == win.id;
      });
      currentWin = win;
    }

    if (resizeLmousedown) {
      console.log(offsetLeft + deltaLeft + mouse.x - mouseOffsetX, mouseOffsetX - mouse.x);
      console.log($("#".concat(win.id)).width(), mouseOffsetX, mouse.x);
      windows.find(function (w) {
        return w.id == win.id;
      }).resizeEW(offsetLeft + deltaLeft + mouse.x - mouseOffsetX, mouseOffsetX + origionalWidth - mouse.x);
      if ($("#".concat(win.id)).width() < 200) $("#".concat(win.id)).width(200);
      windows.find(function (w) {
        return w.id == win.id;
      }).width = $("#".concat(win.id)).width();
      windows.find(function (w) {
        return w.id == win.id;
      }).height = $("#".concat(win.id)).height();
    }

    if (resizeRmousedown) {
      windows.find(function (w) {
        return w.id == win.id;
      }).resizeEW(deltaLeft, mouse.x - mouseOffsetX + origionalWidth);
      if ($("#".concat(win.id)).width() < 200) $("#".concat(win.id)).width(200);
      windows.find(function (w) {
        return w.id == win.id;
      }).width = $("#".concat(win.id)).width();
      windows.find(function (w) {
        return w.id == win.id;
      }).height = $("#".concat(win.id)).height();
    }

    if (resizeTmousedown) {
      windows.find(function (w) {
        return w.id == win.id;
      }).resizeNS(deltaTop + mouse.y - mouseOffsetY, mouseOffsetY + origionalHeight - mouse.y);
      if ($("#".concat(win.id)).height() < 100) $("#".concat(win.id)).height(100);
      windows.find(function (w) {
        return w.id == win.id;
      }).width = $("#".concat(win.id)).width();
      windows.find(function (w) {
        return w.id == win.id;
      }).height = $("#".concat(win.id)).height();
    }

    if (resizeBmousedown) {
      windows.find(function (w) {
        return w.id == win.id;
      }).resizeNS(deltaTop, mouse.y - mouseOffsetY + origionalHeight);
      if ($("#".concat(win.id)).height() < 100) $("#".concat(win.id)).height(100);
      windows.find(function (w) {
        return w.id == win.id;
      }).width = $("#".concat(win.id)).width();
      windows.find(function (w) {
        return w.id == win.id;
      }).height = $("#".concat(win.id)).height();
    }
  });
  $(document).on('mouseup', function (event) {
    if (objClass != "topBarOverlay") return;

    if ($(win).css('top').replace('px', '') == 0) {
      windows.find(function (w) {
        return w.id == win.id;
      }).maximise();
    }
  });
});