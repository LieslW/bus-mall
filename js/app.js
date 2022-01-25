'use strict';

// console.log('hey there hey!');

// ************* GLOBAL VARIABLES *******************

// +++++ DOM REFERENCES +++++++++++

// listen to the container for voting
let myContainer = document.getElementById('container');
// listen to click on the "button" to display results
let showResultsBtn = document.getElementById('show-results-btn');

// js will populate the src - to display images
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

// reference our canvas element for bar chart
const ctx = document.getElementById('myChart').getContext('2d');

// +++++ OTHER GLOBALS ++++++
const storeArray = [];
let maxVotes = 25;
let counter = 0;


// ******* CONSTRUCTOR FUNCTION TO INSTANTIATE GOATS ********
function Store(name, fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  storeArray.push(this);
}

// ******* INSTANTIATE SOME PRODUCTS *****
new Store('sweep', 'png');
new Store('img');
new Store('img');
new Store('img');
new Store('img');
new Store('img');
new Store('img');
new Store('img');
new Store('img');

console.log(storeArray);

// ***** EXECUTABLE CODE *****

function getRandomIndex() {
  return Math.floor(Math.random() * storeArray.length);
}

let indexCollection = [];
function renderImages() {

  while(indexCollection.length < 3){
    let randoNum = getRandomIndex();
    while(!indexCollection.includes(randoNum)){
      indexCollection.push(randoNum);
    }
  }

  let storeOneIndex = indexCollection.pop();
  let storeTwoIndex = indexCollection.pop();
  let storeThreeIndex = indexCollection.pop();

  // validation - to make sure the images are unique per round
  // **NOTE** your lab will need to have 3 unique images
  // Consider using a container to store your randomIndex numbers and then validate that there are 3 unique numbers in that collection
  // **HINT** an array method might come in handy to see if something is included in your collection...
  // while(storeOneIndex === storeTwoIndex){
  //   storeTwoIndex = getRandomIndex();
  // }
  // while(storeOneIndex === storeThreeIndex){
  //   storeThreeIndex = getRandomIndex();
  // }
  // while(storeTwoIndex === storeThreeIndex){
  //   storeThreeIndex = getRandomIndex();
  // }

  // grab the images and assign src attribute
  imgOne.src = storeArray[storeOneIndex].src;
  imgOne.alt = storeArray[storeOneIndex].name;
  storeArray[storeOneIndex].views++;

  imgTwo.src = storeArray[storeTwoIndex].src;
  imgTwo.alt = storeArray[storeTwoIndex].alt;
  storeArray[storeTwoIndex].views++;

  imgThree.src = storeArray[storeThreeIndex].src;
  imgThree.alt = storeArray[storeThreeIndex].name;
  storeArray[storeThreeIndex].views++;

  // display images
}

renderImages();

function renderChart (){
let storeNames = []; 
  let storeVotes = [];
  let storeViews = [];

  for(let i = 0; i < storeArray.length; i++){
    storeNames.push(storeArray[i].name);
    storeVotes.push(storeArray[i].votes);
    storeViews.push(storeArray[i].views);
  }

  const chartObj = {
    type: 'bar',
    data: {
        labels: storeNames,
        datasets: [{
            label: '# of Votes',
            data: storeVotes,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {label: '# of Views',
        data: storeViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
        }
      
      ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};
// Pull in our Chart code: 2 args: DOM reference & object that will build out our chart
  const myChart = new Chart(ctx, chartobj);

// ***** EVENTS ****

// events - click images
function handleClick(event){
  // max clicks 15 - decriment
  maxVotes--;

  //listen to which image was clicked increase the vote
  let imgClicked = event.target.alt;
  for(let i = 0; i < storeArray.length; i++){
    if(imgClicked === storeArray[i].name){
      storeArray[i].votes++;
    }
  }
  console.log(imgClicked);

  // rerender 2 new images
  renderImages();

  // once max attempts have reached 0 no longer allow clicks
  if(maxVotes === 0){
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event) {
  if (maxVotes === 0) {
    renderChart();
  }
}
  

//Step #1 - Event listener

myContainer.addEventListener('click', handleClick);

// EVENT #2
showResultsBtn.addEventListener('click', handleShowResults);