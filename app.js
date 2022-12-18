console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

//Progam State
const GIPHY_URL = "https://api.giphy.com/v1/gifs/translate";
const GIPHY_KEY = "SDJ6Y4MgsbPD1x31dgMDuSCxIKW3mGc8";

let savedGifs = [];


//Select elements
let feedbackEl = document.querySelector("#feedback"); 
let searchInput = document.querySelector("#searchWord"); 
let searchBtn = document.querySelector("#submitSearch");
let gifEle = document.querySelector("#imageContainer > img");
let imageContainer = document.querySelector("#imageContainer");
let saveBtn = document.querySelector("#saveBtn");
let savedGifsContainer = document.querySelector("#savedGifs");

//Event Handerlers
searchBtn.addEventListener("click", (event) => {
    getGif(searchInput.value);
});

saveBtn.addEventListener("click", (event) => {
    //save the current gif
    savedGifs.push({ 
        src: gifEle.src, 
        alt: gifEle.alt, 
        id: gifEle.getAttribute("data-id"),
    });

    //add the new saved gif to the saved gif container
    let newGif = document.createElement("img");
    newGif.src = gifEle.src;
    newGif.alt = gifEle.alt;
    newGif.id = gifEle.getAttribute("data-id");
    savedGifsContainer.prepend(newGif);
  
});

 function getGif(searchTerm) {
    fetch(`${GIPHY_URL}?api_key=${GIPHY_KEY}&s=${searchTerm}`)
   .then((res) => res.json())
    .then((body) => {
        //show the gif on the dom
       gifEle.src = body.data.images.original.url;
       //update the alt value
       gifEle.alt = body.data.title;
       //update the data-id
       gifEle.setAttribute("data-id", body.data.id);
       //display the image container
       imageContainer.classList.remove("hidden");
  })
 .catch ((err) => {
    console.error(err);
    //show the error message on the dom
    feedbackEl.textContent = err.message;
    //hide the image container
    imageContainer.classList.remove("hidden");  
    });
 }

