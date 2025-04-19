// p5.js Kaleidoscope Sketch

let symmetry = 6; // How many points of symmetry (slices)
let angle; // Angle between slices
let clearScreen = false; // Set to true to clear background each frame

function setup() {
  createCanvas(windowWidth, windowHeight);
  angle = TWO_PI / symmetry;
  background(0); // Set initial background (black)
  strokeWeight(4); // Thickness of the lines
  stroke(255); // Initial color of the lines (white)
  colorMode(HSB); // Use Hue, Saturation, Brightness color mode (good for rainbows)
  console.log("Kaleidoscope Ready! Click and drag to draw.");
  console.log("Press 'c' to clear the screen.");
}

function draw() {
  // Option 1: Trails (background only called in setup)
  // Option 2: No Trails (uncomment the line below)
  // background(0);

  // Move the origin (0,0) to the center of the canvas
  translate(width / 2, height / 2);

  // Only draw if the mouse is pressed and inside the canvas
  if (mouseIsPressed === true && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

    // Calculate mouse positions relative to the center
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    // --- Dynamic Color (Optional) ---
    // Calculate hue based on the angle of the mouse relative to center
    let hue = map(atan2(my, mx), -PI, PI, 0, 360);
    // You could also map hue to mouseX, mouseY, or distance from center
    // let hue = map(dist(0, 0, mx, my), 0, width / 2, 0, 360);
    stroke(hue, 90, 100, 0.8); // HSB color with some alpha transparency

    // --- Draw Symmetrical Lines ---
    for (let i = 0; i < symmetry; i++) {
      push(); // Save the centered state

      // Rotate for the current segment
      rotate(i * angle);

      // Draw the primary line segment (from previous mouse pos to current)
      line(mx, my, pmx, pmy);

      // Create the reflection within the segment
      push(); // Save the rotated state
      scale(1, -1); // Reflect vertically across the segment's axis
      line(mx, my, pmx, pmy); // Draw the reflected line
      pop(); // Restore to just rotated state

      pop(); // Restore to the centered state before the next rotation
    }
  }
}

// Adjust canvas size and clear background if window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0); // Clear screen on resize
}

// Clear the screen if 'c' key is pressed
function keyPressed() {
  if (key === 'c' || key === 'C') {
    background(0); // Set background to black (clearing the drawing)
    console.log("Screen cleared.");
  }
}