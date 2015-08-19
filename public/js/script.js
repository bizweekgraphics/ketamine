console.log("\n  _______                                                \n |__   __|                                               \n    | | __ _ _ __   __ _ ___    __ _ _ __ ___            \n    | |/ _` | '_ \\ / _` / __|  / _` | '__/ _ \\           \n    | | (_| | |_) | (_| \\__ \\ | (_| | | |  __/           \n    |_|\\__,_| .__/ \\__,_|___/  \\__,_|_|  \\___|           \n            | |       _ _         _       _              \n            |_|      | | |       | |     | |             \n  ___ _ __ ___   __ _| | |  _ __ | | __ _| |_ ___  ___   \n / __| '_ ` _ \\ / _` | | | | '_ \\| |/ _` | __/ _ \\/ __|  \n \\__ \\ | | | | | (_| | | | | |_) | | (_| | ||  __/\\__ \\  \n |___/_| |_| |_|\\__,_|_|_| | .__/|_|\\__,_|\\__\\___||___/  \n                           | |  (_)                      \n  _   _  ___  _   _    ___ |_|_  _  ___  _   _           \n | | | |/ _ \\| | | |  / _ \\ '_ \\| |/ _ \\| | | |          \n | |_| | (_) | |_| | |  __/ | | | | (_) | |_| |          \n  \\__, |\\___/ \\__,_|  \\___|_| |_| |\\___/ \\__, |          \n   __/ |   _ _   _        __   _/ |       __/ |    _     \n  |___/   (_) | | |      / _| |__(_)     |___/    | |    \n __      ___| |_| |__   | |_ _ __ _  ___ _ __   __| |___ \n \\ \\ /\\ / / | __| '_ \\  |  _| '__| |/ _ \\ '_ \\ / _` / __|\n  \\ V  V /| | |_| | | | | | | |  | |  __/ | | | (_| \\__ \\\n   \\_/\\_/ |_|\\__|_| |_| |_| |_|  |_|\\___|_| |_|\\__,_|___/\n                                                         \n                                                                     \n              ____\n              )==(\n              )==(\n              |H |\n              |H |\n              |H |\n             /====\\\n            /  BW  \\\n           /========\\\n          :HHHHHHHH H:\n          |HHHHHHHH H|\n          |HHHHHHHH H|\n          |HHHHHHHH H|\n   \\______|=/========\\________/\n    \\     :/oO/      |\\      /\n     \\    / oOOO     | \\    /\n      \\__/| OOO      |  \\__/\n       )( |  O       |   )(\n       )( |==========|   )(\n       )( |HHHHHHHH H|   )(\n       )( |HHHHHHHH H|   )(\n      .)(.|HHHHHHHH H|  .)(.\n     ~~~~~~~~~~~~~~~~  ~~~~~~            \n\n");

var body = d3.select("body"),
    mouse = [0,0],
    scrollTop = 0,
    openerVisible = true,
    invert = false,
    invertBreakpoints,
    gifs = [
      "animation_spark.gif",
      "animation_spark2.gif",
      "k.gif",
      "k2.gif",
      "k2_s.gif",
      "k3.gif",
      "k3_s.gif",
      "lips.gif",
      "hap-face.gif",
      "hap-face2.gif",
      "hap-face3.gif",
      "hap-face4.gif",
      "hap-face4s.gif",
      "guy1.gif"
    ];

// set up canvas
var canvas = body.select(".opener").append("canvas");
var ctx = canvas.node().getContext("2d");
ctx.fillStyle = "#000000";
ctx.globalCompositeOperation = "xor";

// some layout
handleSizing();
handleScroll();
d3.timer(render);
var gifInterval = setInterval(renderGifs, 150);

// bindings
d3.select(window).on("scroll", handleScroll);
d3.select(window).on("resize", handleSizing);
d3.select("body").on("mousemove", function() {
  mouse = d3.mouse(this);
});

// scaling
var textSizeScale = d3.scale.linear()
  .domain([1280, 320])
  .range([240, 120]);

function render(t) {

  if(!openerVisible) return false;

  var w = canvas.node().width,
      h = canvas.node().height;

  ctx.clearRect(0,0,canvas.node().width, canvas.node().height);

  d3.range(20).map(function(i) {
    var baseBandWidth = canvas.node().width / 39;
    var offset = 2*baseBandWidth * i;
    var bandWidth = baseBandWidth * (Math.abs(offset - mouse[0])/w + 0.5);
    ctx.fillRect(offset, 0, bandWidth, h);
  })
  d3.range(20).map(function(i) {
    var baseBandWidth = canvas.node().height / 39;
    var offset = 2*baseBandWidth * i;
    var bandWidth = baseBandWidth * (Math.abs(offset - mouse[1])/h + 0.5);
    ctx.fillRect(0, offset, w, bandWidth);
  })

  // timer:  Math.sin(t/500 + (t/10000)*i)
  // scroll: Math.sin(t/500 + (scrollTop/200)*i)
  var circles = d3.range(50).map(function(i) { return (10*(50-i) + 5*Math.sin(t/500 + ((scrollTop+620)/200)*i)); }).sort(d3.descending);
  
  ctx.globalCompositeOperation = "source-over";
  circles.forEach(function(d, i) {
    ctx.beginPath();
    ctx.arc(w/2, h/2, d, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.globalCompositeOperation = "xor";
  })

  // draw text
  ctx.font = "bold "+textSizeScale(w)+"px 'Druk Web'";
  ctx.fillText("KETAMINE", w/2, h/2);
}

function handleScroll() {
  
  // save scrolltop
  scrollTop = d3.select("html").node().scrollTop || d3.select("body").node().scrollTop;

  // show/hide opener
  var oldOpenerVisible = openerVisible;
  openerVisible = scrollTop < innerHeight + 300;
  if(openerVisible !== oldOpenerVisible) {
    d3.select(".opener").style("visibility", openerVisible ? "visible" : "hidden");
  }
  
  // handle color inversion
  var oldInvert = invert;
  invertBreakpoints.forEach(function(d,i) {
    if(scrollTop + innerHeight/2 > d) {
      invert = i % 2 == 1;
    }
  })
  if(invert !== oldInvert) {
    body.classed("invert", invert);
  }
}

function handleSizing() {  

  if(innerWidth < 728) {
    // "mobile" (narrow) layout
    canvas
      .attr("width", innerWidth)
      .attr("height", innerHeight-91);
    d3.select(".opener").style("height", (innerHeight-91)+"px");
  } else {
    // "desktop" (wide) layout
    canvas
      .attr("width", innerWidth)
      .attr("height", innerHeight);
    d3.select("article").style("margin-top", innerHeight+"px");
  }

  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";

  // find breakpoints for color inversion
  invertBreakpoints = getInverterBreakpoints();

}

function getInverterBreakpoints() {
  // breaks at the vertical middle of the container with the inverter class
  var breakpoints = d3.selectAll(".inverter")[0].map(function(d) { 
    return d.offsetTop + d.offsetHeight/2; 
  })
  // add the top of the page as a breakpoint
  breakpoints.unshift(0);
  return breakpoints;
}

function renderGifs() {

  // don't render gifs below 400px wide
  if(innerWidth < 400) return false;

  var angle = Math.floor(Math.random()*360);
  var radius = innerWidth / 1.7;
  var origin = [innerWidth/2, innerHeight/2];

  // max-width: 1280px / 6.4 = 200px
  var maxWidth = innerWidth / 6.4;

  body.select(".opener").append("img")
    .attr("src", "img/" + _.sample(gifs))
    .style("top", Math.floor(radius*Math.sin(angle) + origin[1])+"px")
    .style("left", Math.floor(radius*Math.cos(angle) + origin[0])+"px")
    .style("-webkit-transform", "translate(-50%,-50%) rotate(0deg)")
    .style("transform", "translate(-50%,-50%) rotate(0deg)")
    .style("max-width", maxWidth+"px")
  .transition()
    .duration(5000)
    .ease("linear")
    .style("top", origin[1]+"px")
    .style("left", origin[0]+"px")
    .style("-webkit-transform", "translate(-50%,-50%) rotate(180deg)")
    .style("transform", "translate(-50%,-50%) rotate(180deg)")
    .style("max-width", "1px")
    .remove();

}