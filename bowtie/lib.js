var canvas = document.createElement("CANVAS")
document.getElementById("game").appendChild(this.canvas)
canvas.height = 500;
canvas.width = 500;
var mouseX = 0;
var mousey = 0;


var Canvas = {
	fill: function() {
		console.log(window.InnerWidth)
		canvas.width = window.InnerWidth
		canvas.height = window.InnerHeight
	}
}

var clear = true;

var ctx = canvas.getContext("2d")
window.onload = init;
var i = setInterval(mupdate, 50)

function randint(m, l) {
	return Math.floor((Math.random() * (l-m))+m);
}

function noloop() {
	clear = false;
}

function line(x,y,x1,y1) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

function line3d(x,y,z,x1,y1,z1) {
	i1 = flatten(x,y,z);
	i2 = flatten(x1,y1,z1)
	ctx.beginPath();
	ctx.moveTo(i1[0], i1[1]);
	ctx.lineTo(i2[0], i2[1]);
	ctx.stroke();
	ctx.fill()
}

function color(c) {
	ctx.fillStyle = c;
	ctx.strokeStyle = c;
}

function w(n) {
	ctx.lineWidth = n;
}

function square(x,y,w=30,h=30) {
	ctx.fillRect(x,y,w,h)
}

function translate(x,y) {
	ctx.translate(x,y)
}

function rotate(a,type="radians") {
	ctx.rotate(a*Math.PI/180)
}

function save() {
	ctx.save()
}

function restore() {
	ctx.restore()
}

function ellipse(x,y,r=15) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fill();
}

function Vector(){
	this.x = 0
	this.randvector = function(min, lim) {
		this.x = randint(min, lim)
	}
}

function Vector2(x=0,y=0){
	this.x = x
	this.y = y
	this.randvector = function(min, lim) {
		this.x = randint(min, lim)
		this.y = randint(min, lim)
	}

	this.add = function(a) {
		try {
			this.x += a
			this.y += a
		} catch {
			this.x += a.x
			this.y += a.y
		}
	}
}

function Vector3(x=0,y=0,z=0){
	this.x = x
	this.y = y
	this.z = z
	this.randvector = function(lim) {
		this.x = randint(min, lim)
		this.y = randint(min, lim)
		this.z = randint(min, lim)
	}
}

function flatten(x,y,z) {
	return [(x/z)*50,(y/z)*50]
}

function point3d(x,y,z) {
	ellipse(flatten(x,y,z)[0],flatten(x,y,z)[1], r=2)
}

function point(x,y) {
	ellipse(x,y,r=5)
}

function mupdate() {
	if (clear) {
	    ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
	update();
}
