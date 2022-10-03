// App.js

const IMAGE_PATH = 'images/';

// Api url
const url = new URL("http://localhost:8080/api");

// Function to get the cats data with arguments for sorting
function getCats(sortType = 'default') {
  // Fetch cat data locally
  //   const catInfoData = fetch("./catdata.json")
  //     .then((response) => response.json())
  //     .catch((error) => console.log(error));

  // Api call from the backend server
  const catInfoData = fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  let cats = document.getElementById("cats");
  const tbl = document.createElement("table");
  tbl.style.width = "200";

  cats.appendChild(tbl);

  // Loop through fetched data and add them into a table
  catInfoData.then((items) => {
	console.log(items);
    let catData = items;
    // Sort ASC
    if (sortType == "cute") {
      catData.sort(
        (a, b) => parseInt(a.cutenessLevel) - parseInt(b.cutenessLevel)
      );
    }
    // Sort DESC
    else if (sortType == "not-cute") {
      catData.sort(
        (a, b) => parseInt(b.cutenessLevel) - parseInt(a.cutenessLevel)
      );
    }
    console.log(catData);
	// Creates table body and passes rows & cells with images and names
    let tableBody = tbl.createTBody();
    let i = 0;
    let row = tableBody.insertRow();
    catData.forEach(function (catDataFullItem) {
      let cell = row.insertCell();
      i++;
      if (i % 2 == 0) {
        row = tableBody.insertRow();
      }
      if (
        typeof catDataFullItem.image === "string" &&
        catDataFullItem.image.match(".jpg|.jpeg|.png")
      ) {
        let catImg = document.createElement("img");
        catImg.src = IMAGE_PATH + catDataFullItem.image;
		// Some images had the wrong format, temporary solution to replace the format
		if (catImg.naturalWidth === 0) {
			if (catDataFullItem.image.includes(".jpg")) {
        	  catImg.src = IMAGE_PATH + catDataFullItem.image.replace("jpg", "png");
			}
		} 
		cell.appendChild(catImg);
        let catName = document.createElement("p");
        catName.style = "text-align:center;";
        catName.innerText = catDataFullItem.name;
        cell.appendChild(catName);
      }
    });
  });
}
let sortBtn = document.getElementsByClassName("sort-btn");

// Calls the function getCats and passes sorting parameters if there are any
const displayCats = function() {
	document.getElementById('cats').innerHTML = '';
	let sortType = this.getAttribute('data-sort-type');
	if (sortType) {
		getCats(sortType);
	} else {
		getCats();
	}
};

// Buttons share the same class, when clicked the listener fires
for (let i = 0; i < sortBtn.length; i++) {
	sortBtn[i].addEventListener('click', displayCats, false);
}

getCats();
