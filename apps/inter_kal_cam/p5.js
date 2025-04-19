let video;
let symmetry = 6;
let angle;
let lastFrame;
let sensitivity = 20; // Adjust this to change how sensitive the effect is to movement

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    
    // Initialize video capture
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    
    // Initialize variables
    angle = 360 / symmetry;
    background(0);
    colorMode(HSB, 255);
    noStroke();
    
    // Create initial frame for comparison
    lastFrame = createImage(video.width, video.height);
}

function draw() {
    // Get the current frame from the video
    let currentFrame = video.get();
    
    // Only proceed if we have both frames
    if (lastFrame.width > 0) {
        // Calculate differences between frames
        currentFrame.loadPixels();
        lastFrame.loadPixels();
        
        translate(width/2, height/2);
        
        // Sample points in a grid
        for (let y = 0; y < video.height; y += 10) {
            for (let x = 0; x < video.width; x += 10) {
                let loc = (x + y * video.width) * 4;
                
                // Compare frames to detect motion
                let r1 = currentFrame.pixels[loc];
                let g1 = currentFrame.pixels[loc + 1];
                let b1 = currentFrame.pixels[loc + 2];
                
                let r2 = lastFrame.pixels[loc];
                let g2 = lastFrame.pixels[loc + 1];
                let b2 = lastFrame.pixels[loc + 2];
                
                // Calculate difference
                let diff = dist(r1, g1, b1, r2, g2, b2);
                
                // If there's enough movement, draw
                if (diff > sensitivity) {
                    // Map video coordinates to canvas
                    let mappedX = map(x, 0, video.width, -width/4, width/4);
                    let mappedY = map(y, 0, video.height, -height/4, height/4);
                    
                    // Draw kaleidoscope pattern
                    for (let i = 0; i < symmetry; i++) {
                        push();
                        rotate(i * angle);
                        
                        // Use color from video
                        fill(r1, g1, b1, 150);
                        
                        // Draw shapes based on movement
                        let size = map(diff, 0, 255, 2, 15);
                        ellipse(mappedX, mappedY, size, size);
                        
                        // Mirror effect
                        push();
                        scale(1, -1);
                        ellipse(mappedX, mappedY, size, size);
                        pop();
                        
                        pop();
                    }
                }
            }
        }
    }
    
    // Store current frame for next comparison
    lastFrame.copy(currentFrame, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function keyPressed() {
    if (key === 'c' || key === 'C') {
        background(0);
    }
    if (key === 's' || key === 'S') {
        saveCanvas('kaleidoscope', 'png');
    }
    // Adjust sensitivity with arrow keys
    if (keyCode === UP_ARROW) {
        sensitivity = constrain(sensitivity + 5, 0, 100);
        console.log('Sensitivity:', sensitivity);
    } else if (keyCode === DOWN_ARROW) {
        sensitivity = constrain(sensitivity - 5, 0, 100);
        console.log('Sensitivity:', sensitivity);
    }
}