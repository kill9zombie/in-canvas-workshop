// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

let state = {
  x: 0,
  y: 0,
};

function drawShapes(ctx, shapes) {
  shapes.forEach((shape) => {
    if (shape?.type === "rect") {
      radians = (Math.PI / 180) * shape.degrees;

      ctx.save();
      // ctx.rotate(radians);
      ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
      ctx.restore();
    }
    if (shape?.type === "stripe") {
      // ctx.rotate(radians);
      ctx.fillStyle = shape.color;
      ctx.fillRect(-(ctx.canvas.width), shape.y, (ctx.canvas.width * 3), shape.height);
    }
    if (shape?.type === "arc") {
      ctx.fillStyle = `rgb(${shape.r}, ${shape.r}, ${shape.r})`;
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, shape.startAngle, shape.endAngle);
      // ctx.fillStyle = rgb(shape.r, shape.g, 0);
      ctx.fill();
    }
  });
}

function randomArc(ctx) {
  let x = Math.floor(Math.random() * ctx.canvas.width);
  let y = Math.floor(Math.random() * ctx.canvas.height);
  const radius = Math.floor((Math.random() * ctx.canvas.height) / 8);

  if (x + radius > ctx.canvas.width) {
    x = x - radius;
  }
  if (x - radius < 0) {
    x = x + radius;
  }
  if (y + radius > ctx.canvas.height) {
    y = y - radius;
  }
  if (y - radius < 0) {
    y = y + radius;
  }

  const randomColor = (_) => {
    return Math.floor(Math.random() * 253) + 2;
  };
  let r = randomColor();
  let g = randomColor();
  let b = randomColor();

  return {
    type: "arc",
    x: x,
    y: y,
    r: r,
    g: g,
    b: b,
    radius: radius,
    startAngle: 0,
    endAngle: 2 * Math.PI,
  };
}

function randomRect(ctx) {
  const x = Math.floor(Math.random() * ctx.canvas.width);
  let y = Math.floor(Math.random() * ctx.canvas.height);
  const width = Math.floor(Math.random() * ctx.canvas.width);
  const height = Math.floor(Math.random() * (ctx.canvas.height / 10));
  const degrees = Math.floor(Math.random() * 90);

  if (y + height > ctx.canvas.height) {
    y = y - height;
  }

  let rectangles = [];

  if (x + width > ctx.canvas.width) {
    rectangles.push({
      type: "rect",
      x: x,
      y: y,
      width: width,
      height: height,
      degrees: degrees,
    });
    rectangles.push({
      type: "rect",
      x: 0,
      y: y,
      width: width - (ctx.canvas.width - x),
      height: height,
      degrees: degrees,
    });
  } else {
    rectangles.push({
      type: "rect",
      x: x,
      y: y,
      width: width,
      height: height,
      degrees: degrees,
    });
  }

  return rectangles;
}

// Takes the canvas context and an array of colours
//
// Returns an random stripe y and height
function randomStripe(ctx, pallete) {
  const y = Math.floor(Math.random() * ctx.canvas.height);
  const height = Math.floor(Math.random() * (ctx.canvas.height / 10));
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

    // ctx.fillStyle = 'rgb(200, 0, 0)';
    // ctx.fillRect(10, 10, 50, 50);

    // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    // ctx.fillRect(30, 30, 50, 50);

    // ctx.strokeStyle = '#0000ff';
    // ctx.beginPath();
    // ctx.moveTo(75, 50);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.closePath();
    // ctx.stroke();
    //
    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    let r = [...Array(45).keys()].flatMap((_) => {
      return randomStripe(ctx, pallete);
    });

    // [...Array(5).keys()].flatMap((_) => {
    //   r.push(randomArc(ctx));
    // });

    // let r = randomRect(ctx);
    console.log(r);
    ctx.fillStyle = 'rgb(10, 10, 10)';
    ctx.fillRect(-(ctx.canvas.width), 0, (ctx.canvas.width * 3), (ctx.canvas.height * 3));


    ctx.save();
    ctx.translate(90, 0);
    // ctx.rotate((Math.PI /180) * 3);
    drawShapes(ctx, r);
    ctx.restore()

    ctx.fillStyle = 'rgb(90,210, 10)';
    ctx.fillRect((ctx.canvas.width / 2), (ctx.canvas.height / 2), 17, 17);

    const repeat = document.querySelector(".repeat");
    const dataURL = ctx.canvas.toDataURL("image/png");
    repeat.style = `background-image: url("${dataURL}")`;
  }
}

function paint(ctx) {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
