var capture;
var imgArray = [];
var page = 0;
var maxpage = 14;
var input;
inputShow = false;
polaroid = 0


function preload() {
  // load all images from prototypes as each page.
  for (k = 0; k<maxpage+1; k++){ // max K is number of .png files / slides
  imgArray[k] = loadImage("Prototype"+k+".png");  // naming convention is "Prototype[k].png"
  }
  }

function setup() {
  c = createCanvas(1440,821);         // firefox browser dimensions 
  capture = createCapture(VIDEO);   // starts video capture
  capture.size(650,570);            // sizes video
  capture.hide();                   // hides video until the slide where we need it.
  
  input = createInput();            // creates input 
  button = createButton('Submit');  // submission button to save the image with text "submit"
  button.mousePressed(savefile);    // saves the image
  button.hide();                    // hides the button until the slide that its necessary
  loadQuestion();
}

function draw() {
  // each page goes up as page goes up. Starts at 2 and mouse or keyboard events will change page.
  for (i = 0; i <=page; i++){
    
    //clear the background so the images don't stack
    background(255, 150, 255); 
    
    // displays image i from imgArray
    image(imgArray[i], 0, 0);
    
    // on slide 5-10, show video capture. 
    if (i>=4 && i<=10) {
        image(capture, 400, 288);
        image(imgArray[i], 0, 0); //this places the image on top, don't ask my why it has to be done this way       
    }

    // on slide 13, ask for input and save a picture
    if (i==14){
          inputShow = true;
          image(capture, 60, 60); 
          image(imgArray[i], 0, 0); //this places the image on top, don't ask my why it has to be done this way       
          input.show();
          button.show();
          input.position(100, 600); //was 130, 720
          input.size(500, 120); // was 500, 120
          input.style("font","normal 22px arial")
          texts = input.value();
          button.position(200, 760); //was 340 850
          push();
          textSize(30);
          textStyle(BOLD);
          textFont("Arial");
          text(question, 100, 580) // was 130 700
          pop();
    }
    if ( i != 14 && inputShow) {
      input.hide();
      button.hide();
      inputShow = false;
    }
  }
}


// add page
// function mouseClicked() {
//   page++;
//   if (page == (maxpage+1)) {
//     page =0;
//   }
// }

// move page based on key events.
function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode == UP_ARROW) {
    page --;
    print(page);
      if (page == -1) {
    page = maxpage;
  }
  } else if (keyCode === RIGHT_ARROW || keyCode == DOWN_ARROW) {
    page++;
      if (page == (maxpage+1)) {
    page =0;
  }
  }
}

function savefile() {
  showtext = true;
    if (showtext) {           // writes the text, because input box gets hidden
      textSize(24);
      textStyle(ITALIC);
      textFont("Roboto")  // TODO: Fix the fonts and stuff here
      text(texts, 130, 640);
    }
  saveCanvas(c, "polaroid" + polaroid+ ".png");
  polaroid ++;
  loadQuestion();
  input.value('')
  page++;
    if (page == (maxpage+1)) {
    page =0;
    }
  showtext = false;
  return false;
}

function loadQuestion() {
  questions = ["23andWe showed me...", "I was uncomfortable about...", "What was surprising?", "I would ask my ancestors..."]
  question = random(questions)
}