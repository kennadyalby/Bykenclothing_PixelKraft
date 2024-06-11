//Initial references
let container = document.querySelector(".container");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
var c=0;

//Events object
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Initially draw and erase would be false
let draw = false;
let erase = false;

//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent(it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

// Function to create the grid
function createGrid() {
  //Initially clear the grid (old grids cleared)
  container.innerHTML = "";
  //count variable for generating unique ids
  let count = 0;

  //loop for creating rows
  for (let i = 0; i < 45; i++) {
    //incrementing count by 2
    count += 2;
    //Create row div
    let div = document.createElement("div");
    div.classList.add("gridRow");
    //Create Columns
    for (let j = 0; j < 47; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      /* We need unique ids for all columns (for touch screen specifically) */
      col.setAttribute("id", `gridCol${count}`);

      /*
      For eg if deviceType = "mouse"
      the statement for the event would be events[mouse].down which equals to mousedown
      if deviceType="touch"
      the statement for event would be events[touch].down which equals to touchstart
       */

      col.addEventListener(events[deviceType].down, () => {
        //user starts drawing
        draw = true;
        //if erase = true then background = transparent else color
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        /* elementFromPoint returns the element at x,y position of mouse */
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        //checker
        checker(elementId);
      });
      //Stop drawing
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });
      //append columns
      div.appendChild(col);
    }
    //append grid to container
    container.appendChild(div);
  }
}

// Call the createGrid function immediately after the page loads
window.onload = createGrid;

function checker(elementId) {
  let gridColumns = document.querySelectorAll(".gridCol");
  //loop through all boxes
  gridColumns.forEach((element) => {
    //if id matches then color
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

//Clear Grid
let clearGridButton = document.getElementById("clear-grid");
clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
  createGrid();
});

//Erase Button
eraseBtn.addEventListener("click", () => {
  erase = true;
});

//Paint button
paintBtn.addEventListener("click", () => {
  erase = false;
});

// color circle
let colorWhite = document.getElementById("whitediv");
let colorBlack = document.getElementById("blackdiv");
let colorBlue = document.getElementById("bluediv");
let colorPink = document.getElementById("pinkdiv");


const image1 = document.getElementById('white');
const image2 = document.getElementById('black');
const image3 = document.getElementById('blue');
const image4 = document.getElementById('pink');
image1.style.display = 'block';
image2.style.display = 'none';
image3.style.display = 'none';
image4.style.display = 'none';

colorWhite.addEventListener('click',whiteTshirt);
colorBlack.addEventListener('click',blackTshirt);
colorBlue.addEventListener('click',blueTshirt);
colorPink.addEventListener('click',pinkTshirt);
 
function whiteTshirt(){
    image1.style.display = "block";
    image2.style.display = 'none';
    image3.style.display = 'none';
    image4.style.display = 'none';
}
function blackTshirt(){
  image1.style.display = "none";
  image2.style.display = 'block';
  image3.style.display = 'none';
  image4.style.display = 'none';
}
 
function blueTshirt(){
  image1.style.display = "none";
  image2.style.display = 'none';
  image3.style.display = 'block';
  image4.style.display = 'none';
}
 
function pinkTshirt(){
  image1.style.display = "none";
  image2.style.display = 'none';
  image3.style.display = 'none';
  image4.style.display = 'block';
}





//Leaderboard
// Function to take a screenshot and display it and default images
let screenshotButton = document.getElementById("screenshot-btn");
  screenshotButton.addEventListener("click", takeScreenshot);

  // Initialize the current card index
let currentCardIndex = 1; //why 1? to create new card image and put first card as default
// Function to create a new card
function createCard() {
  // Create a new card element
  let card = document.createElement("div");
  card.classList.add("card");
  
  // Create a box for the content
  let box = document.createElement("div");
  box.classList.add("box");

  // Create an image element for the screenshot
  let imgElement = document.createElement("img");
  imgElement.src = "";
  imgElement.alt = "Screenshot";
  imgElement.classList.add("newimage");

  // Create a name element
  let nameElement = document.createElement("div");
  var nameInput = document.getElementById("nameInput").value;
  nameElement.classList.add("name");
  nameElement.textContent = nameInput; // Adjust as needed

  // Create a vote button
  let voteBtn = document.createElement("button");
  voteBtn.textContent = "Vote";
  voteBtn.classList.add("vote-btn");
  let voteCount = 0; // Initial vote count

  // Create a span for the vote count
  let voteCountSpan = document.createElement("span");
  voteCountSpan.textContent = voteCount;
  voteCountSpan.classList.add("vote-count");

  // Append elements to the box
  box.appendChild(imgElement);
  box.appendChild(nameElement);
  box.appendChild(voteBtn);
  box.appendChild(voteCountSpan);

  // Append the box to the card
  card.appendChild(box);

  // Append the card to the carousel
  document.querySelector(".carousel").appendChild(card);

  // Add event listener to the vote button
  voteBtn.addEventListener("click", () => {
      // Increment the vote count
      voteCount++;
      // Update the vote count text
      voteCountSpan.textContent = voteCount;
      // Sort the cards based on vote count
      sortCards();
  });
}

// Sort the cards based on vote count
function sortCards() {
  let carousel = document.querySelector(".carousel");
  let cards = Array.from(carousel.querySelectorAll('.card'));

  cards.sort((a, b) => {
      let voteCountA = parseInt(a.querySelector(".vote-count").textContent);
      let voteCountB = parseInt(b.querySelector(".vote-count").textContent);
      return voteCountB - voteCountA;
  });

  cards.forEach(card => {
      carousel.appendChild(card);
  });
}

// Function to take a screenshot and display it
function takeScreenshot() {
  
  // Capture screenshot for the current card
  html2canvas(document.querySelector(".gameBgimage"), {
      allowTaint: true,
      useCORS: true,
      // increase the scale for better quality
  }).then(function (canvas) {
      let image = canvas.toDataURL("image/png", 0.5); // increase the quality to 1.0

      // Create a new card if needed
      if (document.querySelectorAll('.card').length <= currentCardIndex) {
          createCard();
      }
      // Global variable
      // var c = 0;
      // Check if c is not equal to 0
      if (c !== 0) {
        // Create a button element
        var button = document.createElement("button");
        button.className = "vote-btn";
        button.textContent = "Vote";
        // Append the button to the body or any other desired element
        document.body.appendChild(button);
      }

      // Update the corresponding img tag inside the current card
      // if(c!=0){
        let imgElement = document.querySelectorAll('.newimage')[currentCardIndex];
        imgElement.src = image;
        // Optionally, update the alt text of the image
        imgElement.alt = "Screenshot " + (currentCardIndex + 1); // Adjust the alt text as needed  
      // }
      // c=c+1;

      // Move to the next card
      currentCardIndex++;
  }).catch((e) => {
      console.log(e);
  });
}


