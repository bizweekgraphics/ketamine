var body = d3.select("body"),
    mouse = [0,0],
    scrollTop = 0,
    invert = false;

var canvas = body.append("canvas")
    .attr("width", innerWidth)
    .attr("height", innerHeight);

var ctx = canvas.node().getContext("2d");
ctx.fillStyle = "#000000";
ctx.textBaseline = 'middle';
ctx.textAlign = "center";
ctx.globalCompositeOperation = "xor";

var hed = d3.select("h1").text();

d3.timer(function(t) {

  ctx.clearRect(0,0,canvas.node().width, canvas.node().height);

  d3.range(20).map(function(i) {
    var baseBandWidth = canvas.node().width / 39;
    var offset = 2*baseBandWidth * i;
    // var bandWidth = baseBandWidth * (0.5*Math.sin((i-10)*t/10000)+1);
    var bandWidth = baseBandWidth * (Math.abs(offset - mouse[0])/canvas.node().width + 0.5);
    ctx.fillRect(offset, 0, bandWidth, canvas.node().height);
  })
  d3.range(20).map(function(i) {
    var baseBandWidth = canvas.node().width / 39;
    var offset = 2*baseBandWidth * i;
    // var bandWidth = baseBandWidth * (0.5*Math.sin((i-10)*t/10000)+1);
    var bandWidth = baseBandWidth * (Math.abs(offset - mouse[1])/canvas.node().height + 0.5);
    ctx.fillRect(0, offset, canvas.node().width, bandWidth);
  })

  // timer:  Math.sin(t/500 + (t/10000)*i)
  // scroll: Math.sin(t/500 + (scrollTop/200)*i)
  var circles = d3.range(50).map(function(i) { return (10*(50-i) + 5*Math.sin(t/500 + (scrollTop/200)*i)); }).sort(d3.descending);
  
  ctx.globalCompositeOperation = "source-over";
  circles.forEach(function(d, i) {
    ctx.beginPath();
    ctx.arc(innerWidth/2, innerHeight/2, d, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.globalCompositeOperation = "xor";
  })

  drawZoomingText(t, ctx, "KETAMINE", 90);

});

// var invert;
d3.select(window).on("scroll", function() {
  scrollTop = body.node().scrollTop;
  var oldInvert = invert;
  invert = Math.floor(body.node().scrollTop / 1000) % 2 == 1;
  if(invert !== oldInvert) body.classed("invert", invert);
})

d3.select("body").on("mousemove", function() {
  mouse = d3.mouse(this);
})

function cycleRadius(t,i) {
  return (20*(10-i)) + 200*(Math.sin(i*t/5000)+1);
}

function pulsingConcentric(t,i) {
  return d3.range(100).map(function(i) { return (10*(100-i) + 5*Math.sin(t/500 + 5*i)); }).sort(d3.descending);
}

// http://stackoverflow.com/a/8937497/120290 :)
function drawEqTriangle(ctx, side, cx, cy){
    
  var h = side * (Math.sqrt(3)/2);

  // ctx.strokeStyle = "#ff0000";

  ctx.save();
  ctx.translate(cx, cy);

  ctx.beginPath();

    ctx.moveTo(0, -h / 2);
    ctx.lineTo( -side / 2, h / 2);
    ctx.lineTo(side / 2, h / 2);
    ctx.lineTo(0, -h / 2);

    // ctx.stroke();
    ctx.fill(); 

  ctx.closePath();
  ctx.translate(-cx, -cy);
  ctx.save();

}

function drawEqTriangleRing(t, ctx, radius, number, direction) {
  for (var i = 0; i < number; i++) {
    var theta = i * 2 * Math.PI / number; 
    drawEqTriangle(
        ctx, 
        20*Math.sin(t/1000 + theta*2) + 50, 
        canvas.node().width/2 + radius*Math.sin(direction*t/1000 + theta), 
        canvas.node().height/2 + radius*Math.cos(direction*t/1000 + theta)
      );
  }
}

function drawZoomingText(t, ctx, text, scrub) {
  textArray = text.split(" ");
  for (var i = textArray.length - 1; i >= 0; i--) {
    // ctx.globalAlpha = Math.min(1, Math.max(0, 1 - (scrub/200 - i)));

    ctx.font = "bold "+Math.floor((scrub*2/(i*i+1)))+"px sans-serif";

    ctx.fillStyle = i%1 == 0 ? "#000000" : "#ffffff";
    ctx.fillText(textArray[i], innerWidth/2, innerHeight/2);

    // ctx.strokeStyle = i%1 == 1 ? "#000000" : "#ffffff";
    // ctx.strokeText(textArray[i], innerWidth/2, innerHeight/2);
  };
  // ctx.globalAlpha = 1;
}