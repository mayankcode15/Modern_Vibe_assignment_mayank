const canvas = document.getElementById('lineCanvas');
const distanceDisplay = document.getElementById('distance');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Initial line positions
let line1Y = 100;
let line2Y = 300;
let draggingLine = null;

// Function to draw the lines and distance
function drawLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Line 1
  ctx.beginPath();
  ctx.moveTo(50, line1Y);
  ctx.lineTo(350, line1Y);
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Draw Line 2
  ctx.beginPath();
  ctx.moveTo(50, line2Y);
  ctx.lineTo(350, line2Y);
  ctx.strokeStyle = '#0000ff';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Update the displayed distance
  const distance = Math.abs(line1Y - line2Y);
  distanceDisplay.textContent = distance;
}

// Check if user is clicking near the lines
function isMouseOnLine(mouseY, lineY) {
  return Math.abs(mouseY - lineY) < 10;
}

// Mouse event listeners
canvas.addEventListener('mousedown', (e) => {
  const mouseY = e.offsetY;
  if (isMouseOnLine(mouseY, line1Y)) {
    draggingLine = 'line1';
    canvas.style.cursor = 'pointer';
  } else if (isMouseOnLine(mouseY, line2Y)) {
    draggingLine = 'line2';
    canvas.style.cursor = 'pointer';
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (draggingLine) {
    if (draggingLine === 'line1') {
      line1Y = e.offsetY;
    } else if (draggingLine === 'line2') {
      line2Y = e.offsetY;
    }
    drawLines();
  }
});

canvas.addEventListener('mouseup', () => {
  draggingLine = null;
  canvas.style.cursor = 'crosshair';
});

// Reset button functionality
resetButton.addEventListener('click', () => {
  line1Y = 100;
  line2Y = 300;
  drawLines();
});

// Initial drawing of lines
drawLines();
