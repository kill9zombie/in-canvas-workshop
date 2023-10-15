// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

// Draws all the shapes in the 'shapes' array onto the canvas context 'ctx'.
function drawShapes(ctx, shapes) {
  shapes.forEach((shape) => {
    if (shape?.type === "stripe") {
      // ctx.rotate(radians);
      ctx.fillStyle = shape.color;
      ctx.fillRect(-(ctx.canvas.width), shape.y, (ctx.canvas.width * 3), shape.height);
    }
  });
}


// Takes the canvas context and an array of colours
//
// Returns an random stripe y and height
function randomStripe(ctx, pallete) {
  const y = Math.floor(Math.random() * ctx.canvas.height);
  const height = Math.floor(Math.random() * ctx.canvas.height);
  const colorIndex = Math.floor(Math.random() * (pallete.length));

  return {type: "stripe", y: y, height: height, color: pallete[colorIndex]};

}

function start() {

  const pallete = [
    'rgb(123, 26, 0)',
    'rgb(113, 16, 0)',
    'rgb(23, 21, 0)',
    'rgb(173, 126, 0)',
    'rgb(123, 56, 10)'
  ];


  const canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    // Part 1, draw a box
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 90, 50);

    // Part 2, draw a circle
    // ctx.beginPath();
    // ctx.arc(150, 250, 70, 0, (2 * Math.PI));
    // ctx.fill();


    // Part 3
    // Draw multiple shapes (stripes first)

    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    //
    // let r = [...Array(5).keys()].flatMap((_) => {
    //   return randomStripe(ctx, pallete);
    // });

    // drawShapes(ctx, r);

    const repeat = document.querySelector(".repeat");
    const dataURL = ctx.canvas.toDataURL("image/png");
    repeat.style = `background-image: url("${dataURL}")`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
