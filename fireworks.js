function record(time) {
    canvas = myGameArea.canvas;
    var recordedChunks = [];
    return new Promise(function (res, rej) {
        var stream = canvas.captureStream(25 /*fps*/);
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        });
        
        //ondataavailable will fire in interval of `time || 4000 ms`
        mediaRecorder.start(time || 4000);

        mediaRecorder.ondataavailable = function (event) {
            recordedChunks.push(event.data);
             // after stop `dataavilable` event run one more time
            if (mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }

        }

        mediaRecorder.onstop = function (event) {
            var blob = new Blob(recordedChunks, {type: "video/webm" });
            var url = URL.createObjectURL(blob);
            document.getElementById("b").href = url;
        }
    })
}

function randint(min, max) {
  return (Math.random() * (max - min + 1)) + min
}

var maininter = false;
var mx = 7000;
var my = 7000;
var first = true;
var particles;
var mt = 0.1;
document.addEventListener('touch', onMouseUpdate);
document.addEventListener('mousedown', onMouseUpdate);
var colors;

var colorsl = [["#FF2424", "coral", "#E7FF2E", "orange"], ["#0A81FF", "teal", "#00FFB3", "dodgerblue"]]
//var colorsl = [["red", "coral", "yellow", "orange", "navy", "blue", "teal", "dodgerblue"]];
var c = "hsl(" + randint(0, 360).toString() + "0, 100%, 67%, 1)";

function onMouseUpdate(e) {
  colors = colorsl[Math.random() * colorsl.length |0];
  maininter = true;
  document.getElementById("m").style.marginLeft = "calc(50% - 155px)"; document.getElementById("m").style.color = colors[Math.random() * colors.length |0];document.getElementById("m").innerHTML = "</br>Happy New Year</br></br>2022";
  setTimeout(function() {maininter = false;}, 600)
  mx = e.pageX;
  my = e.pageY;
}

function startGame() {
    particles = [];
    myGameArea.start();
    setInterval(function() {if (maininter) {particles.push(new component(5, colors[Math.random() * colors.length |0].toString(), mx, my))}}, 20);
    //setInterval(function() {if (maininter) {particles.push(new component(5, "hsl(" + randint(27, 215).toString() + "0, 100%, 31%)", mx, my))}}, 20);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width =  window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.globalAlpha = 0.1;
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, color, x, y) {
    this.size = width;
    this.speed = 2;
    this.x = x;
    this.y = y;
    this.timer = 1.0;
    this.stimer = this.size;
    this.p1 = randint(-this.speed, this.speed);
    this.p2 = randint(-this.speed, this.speed);
    this.update = function() {
        this.x += this.p1;
        this.y += this.p2;
        ctx = myGameArea.context;
        ctx.globalAlpha = 1;
        this.size = this.stimer;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

function updateGameArea() {
    myGameArea.clear();
    if (particles.length == 0) {
        mt += 0.009;
        myGameArea.context.globalAlpha = mt;
        myGameArea.context.fillStyle = "black";
        myGameArea.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height)
    } else {
        mt = 0.1;
    }
    for (i in particles) {
      p = particles[i];
      p.update();
      if (p.timer > 0.1) {
        p.timer -= 0.01;
      } else {
        particles.splice(i, 1);
      }
      if (p.x < 0) {
        particles.splice(i, 1);
      } else if (p.y < 0) {
        particles.splice(i, 1);
      } else if (p.x > myGameArea.width) {
        particles.splice(i, 1);
      } else if (p.y > myGameArea.height) {
        particles.splice(i, 1);
      }
    }
}
