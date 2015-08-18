console.log("\n  _______                                                \n |__   __|                                               \n    | | __ _ _ __   __ _ ___    __ _ _ __ ___            \n    | |/ _` | '_ \\ / _` / __|  / _` | '__/ _ \\           \n    | | (_| | |_) | (_| \\__ \\ | (_| | | |  __/           \n    |_|\\__,_| .__/ \\__,_|___/  \\__,_|_|  \\___|           \n            | |       _ _         _       _              \n            |_|      | | |       | |     | |             \n  ___ _ __ ___   __ _| | |  _ __ | | __ _| |_ ___  ___   \n / __| '_ ` _ \\ / _` | | | | '_ \\| |/ _` | __/ _ \\/ __|  \n \\__ \\ | | | | | (_| | | | | |_) | | (_| | ||  __/\\__ \\  \n |___/_| |_| |_|\\__,_|_|_| | .__/|_|\\__,_|\\__\\___||___/  \n                           | |  (_)                      \n  _   _  ___  _   _    ___ |_|_  _  ___  _   _           \n | | | |/ _ \\| | | |  / _ \\ '_ \\| |/ _ \\| | | |          \n | |_| | (_) | |_| | |  __/ | | | | (_) | |_| |          \n  \\__, |\\___/ \\__,_|  \\___|_| |_| |\\___/ \\__, |          \n   __/ |   _ _   _        __   _/ |       __/ |    _     \n  |___/   (_) | | |      / _| |__(_)     |___/    | |    \n __      ___| |_| |__   | |_ _ __ _  ___ _ __   __| |___ \n \\ \\ /\\ / / | __| '_ \\  |  _| '__| |/ _ \\ '_ \\ / _` / __|\n  \\ V  V /| | |_| | | | | | | |  | |  __/ | | | (_| \\__ \\\n   \\_/\\_/ |_|\\__|_| |_| |_| |_|  |_|\\___|_| |_|\\__,_|___/\n                                                         \n                                                                     \n              ____\n              )==(\n              )==(\n              |H |\n              |H |\n              |H |\n             /====\\\n            /  BW  \\\n           /========\\\n          :HHHHHHHH H:\n          |HHHHHHHH H|\n          |HHHHHHHH H|\n          |HHHHHHHH H|\n   \\______|=/========\\________/\n    \\     :/oO/      |\\      /\n     \\    / oOOO     | \\    /\n      \\__/| OOO      |  \\__/\n       )( |  O       |   )(\n       )( |==========|   )(\n       )( |HHHHHHHH H|   )(\n       )( |HHHHHHHH H|   )(\n      .)(.|HHHHHHHH H|  .)(.\n     ~~~~~~~~~~~~~~~~  ~~~~~~            \n\n");

var body = d3.select("body"),
    mouse = [0,0],
    scrollTop = 0,
    invert = false,
    gifs = ["animation_spark.gif",
"animation_spark2.gif",
"k.gif",
"k2.gif",
"k2_s.gif",
"k3.gif",
"k3_s.gif",
"blob.gif",
"lips.gif",
"hap-face.gif",
"hap-face2.gif",
"hap-face3.gif",
"hap-face4.gif",
"hap-face4s.gif",
"guy1.gif"];



var canvas = body.select(".opener").append("canvas")
    .attr("width", innerWidth)
    .attr("height", innerHeight);

var ctx = canvas.node().getContext("2d");
ctx.fillStyle = "#000000";
ctx.textBaseline = 'middle';
ctx.textAlign = "center";
ctx.globalCompositeOperation = "xor";

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
  var circles = d3.range(50).map(function(i) { return (10*(50-i) + 5*Math.sin(t/500 + ((scrollTop+620)/200)*i)); }).sort(d3.descending);
  
  ctx.globalCompositeOperation = "source-over";
  circles.forEach(function(d, i) {
    ctx.beginPath();
    ctx.arc(innerWidth/2, innerHeight/2, d, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.globalCompositeOperation = "xor";
  })

  drawZoomingText(t, ctx, "KETAMINE", 120);

});

// var invert;
var invertBreakpoints = d3.selectAll(".inverter")[0].map(function(d) { return d.offsetTop; });
d3.select(window).on("scroll", function() {
  scrollTop = body.node().scrollTop;
  var oldInvert = invert;
  invertBreakpoints.forEach(function(d,i) {
    if(scrollTop > d) {
      invert = i % 2 == 1;
    }
  })
  if(invert !== oldInvert) {
    body.classed("invert", invert);
  }
})

d3.select("body").on("mousemove", function() {
  mouse = d3.mouse(this);
})

d3.select(window).on("resize", function() {
  canvas
    .attr("width", innerWidth)
    .attr("height", innerHeight);
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
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

    ctx.font = "bold "+Math.floor((scrub*2/(i*i+1)))+"px 'Druk Web'";

    ctx.fillStyle = i%1 == 0 ? "#000000" : "#ffffff";
    ctx.fillText(textArray[i], innerWidth/2, innerHeight/2);

    // ctx.strokeStyle = i%1 == 1 ? "#000000" : "#ffffff";
    // ctx.strokeText(textArray[i], innerWidth/2, innerHeight/2);
  };
  // ctx.globalAlpha = 1;
}

// PULLQUOTES
// var fizzyText = new FizzyText('Pullquote');


// GIFS

var gifInterval = setInterval(function() {
  var angle = Math.floor(Math.random()*360);
  var radius = innerWidth / 1.7;
  var origin = [innerWidth/2, innerHeight/2];

  // console.log("Starting at:");
  // console.log("top: " + Math.floor(50*Math.sin(angle) + 50)+"%");
  // console.log("left: " + Math.floor(50*Math.cos(angle) + 50)+"%");

  body.select(".opener").append("img")
    .attr("src", "img/" + _.sample(gifs))
    .style("top", Math.floor(radius*Math.sin(angle) + origin[1])+"px")
    .style("left", Math.floor(radius*Math.cos(angle) + origin[0])+"px")
    .style("-webkit-transform", "translate(-50%,-50%) rotate(0deg)")
    .style("max-width", "200px")
    .transition()
    .duration(5000)
    .ease("linear")
    .style("top", origin[1]+"px")
    .style("left", origin[0]+"px")
    .style("-webkit-transform", "translate(-50%,-50%) rotate(180deg)")
    .style("max-width", "1px")
    .remove();

}, 150);