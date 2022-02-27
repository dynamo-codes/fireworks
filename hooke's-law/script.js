var rest = 200;
var mass = 20;
var y = 200 + (mass*10);
// var x = 200;
var k = 0.01;
var acc = 0;
var vel = 0;
// var xacc = 0;
// var xvel = 0;

var anchor = {
	x: 250,
	y: 0
}
var i;

function draw_coil(am) {
	for (i=0; i<y/(am/2); i++) {
		i2 = i*(am/2)
		if (i%2 == 0) {
			line(anchor.x-5,i2,anchor.x+5,i2+5)
		} else {
			line(anchor.x-5,i2+5,anchor.x+5,i2)
		}
	}
}

function init() {
	i = new Image();
	i.src = "sine.png";
}

function update() {
	//line(anchor.x, anchor.y, 250, y)
	//ctx.drawImage(i, anchor.x-10, anchor.y, 20, y);

  color("grey");
  
	draw_coil(10)

	color("coral");

	ellipse(250, y, r=15)

  if (document.getElementById("k").value != k) {
    rest = 200;
    mass = 20;
    y = 200 + (mass*10);
    // var x = 200;
    k = (document.getElementById("k").value);
    acc = 0;
    vel = 0;
    // var xacc = 0;
    // var xvel = 0;
    anchor = {
	    x: 250,
	    y: 0
    }
  }

  if (document.getElementById("m").value != mass) {
    rest = 200;
    mass = (document.getElementById("m").value);
    y = 200 + (mass*10);
    // var x = 200;
    k = (document.getElementById("k").value);
    acc = 0;
    vel = 0;
    // var xacc = 0;
    // var xvel = 0;
    anchor = {
	    x: 250,
	    y: 0
    }
  }

  acc = -k*(y-rest)
	vel += acc;
	y += vel;
	vel *= 0.98;

	// if (anchor.x > x+5) {
	// 	xacc = 1;
	// } else if (anchor.x < x-5) {
	// 	xacc = -1;
	// } else {
	// 	xacc = 0;
	// }
	// xvel += xacc;
	// x += xvel;
	// xvel *= 0.99;
}
