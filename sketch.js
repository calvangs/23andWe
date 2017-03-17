imgArray = [];
pics = [];
pol_width = 700*1.5;

pol_height = 786*1.5;
// Length of big picture
displayDuration = 6000;
// Boolean of Big Image
displayBigImage = false;


function preload() {
  // load the images. Soon change PolaroidTemplate to each picture.
  ipic = loadImage("PolaroidTemplate.png");

}

function setup() {
  // Theme color
  orange = color(232, 68, 0);
  createCanvas(1152*1.5, 648*1.5);
  background(orange);
  resetSketch();

}

function draw() {

  // every minute, reload the images.
  if (second() % 30 == 0) {
    print("Ok we reset now.")
    push();
    fill(orange);
    noStroke();
    rect(0, 0, 696, 1000);
    pop();
    resetSketch();
  }


  // Display all of the objects in pics.
  for (var k = 0; k < pics.length; k++) {
    pics[k].display();

    // Display a big picture
    if (!displayBigImage) {
      bigPic();
    }

    if (displayBigImage) {
      // displayBig method explained below
      pics[r].displayBig();

      // Holds the big image for displayDuration sections
      if ((millis() - startTime) > displayDuration) {
        // this makes it so that they don't stack.
        displayBigImage = false;

        // draws a box over it so that it hides stuff.
        push();
        fill(orange);
        noStroke();
        rect(0, 0, 696, 1000);
        pop();
      }
    }
  }

  // image(template, 36, 36, template.width/1.75, template.height/1.75);
}

// Sets the picture to be big and random. 
function bigPic() {
  r = floor(random(8));
  // print(r);
  displayBigImage = true;
  startTime = millis();
  // return false; // prevent any default behavior
}

// Sets up the Polaroid object. 
function Polaroid(number, widths, heights, ipic) {
  //give them an x, y, number, and picture. 
  this.num = number;
  this.x = widths;
  this.y = heights;
  this.pic = ipic;

  //display them tiny
  this.display = function() {
    image(this.pic, this.x, this.y, pol_width / 8, pol_height / 8);
    // text(this.num, this.x, this.y);
  }

  // display one big.
  this.displayBig = function() {
    if (displayBigImage = true) {
      db = image(this.pic, 36, 36, pol_width / 1.75, pol_height / 1.75);
      // text(this.num, 36, 36, this.y);
    }
  }
}

function resetSketch() {
  imgArray = [];
pics = [];
  // pics.splice(0,14);
  for (k = 0; k < 12; k++) { // max K is number of .png files / slides
    imgArray[k] = loadImage("23andWe/polaroid" + k + ".png?rand=" + random()); // naming convention is "polaroid[k]"   ?random= stops the cache problem and refreshes the images.
    print(k)
  }
  // create polaroid objects, a total of 15. 
  num = 0;
  m = 0;
  // using x and y as modifiers of position.
  for (x = 0; x < 4; x++) {
    for (y = 0; y < 3; y++) {
      widths = (700 + 250 * x);
      heights = (180 + 193 * y);
      // create array of objects; they are all the pics.
      pics.push(new Polaroid(num, widths, heights, imgArray[m]));
      num++
      m++;
    }
  }

}