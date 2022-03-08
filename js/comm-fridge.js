var xhttp;
var xhttp2;
var fridges;
var fridges2;
var addfridgeItems;

window.onload = function() {
    //enableButton();
    //requestData("http://localhost:8000/comm-fridge-data.json");
    let pageId = document.getElementsByTagName("body")[0].id;
    if (pageId != null && pageId == "view_items") {
        requestData("http://localhost:8000/js/comm-fridge-data.json");
        //enableButton()
    } else if (pageId != null && pageId == "add_items") {
        addData("http://localhost:8000/js/comm-fridge-items.json");
        fridgeData("http://localhost:8000/js/comm-fridge-data.json");
        enableButton();
        //addItem();

        //showFridges();
    }

}

function requestData(URL) {
    xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
    xhttp.onreadystatechange = processData; // specify what should happen when the server sends a response
    xhttp.open("GET", URL, true); // open a connection to the server using the GET protocol
    xhttp.send(); // send the request to the server
}

function addData(URL) {
    xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
    xhttp.onreadystatechange = addprocessData; // specify what should happen when the server sends a response
    xhttp.open("GET", URL, true); // open a connection to the server using the GET protocol
    xhttp.send(); // send the request to the server
}

function fridgeData(URL) {
    xhttp2 = new XMLHttpRequest(); // create a new XMLHttpRequest object
    xhttp2.onreadystatechange = addFridgeData; // specify what should happen when the server sends a response
    xhttp2.open("GET", URL, true); // open a connection to the server using the GET protocol
    xhttp2.send(); // send the request to the server
}

function processData() {
    if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        let data = xhttp.responseText; // Data returned by the AJAX request
        fridges = JSON.parse(data); // Convert the JSON data to a JavaScript object

        displayFridges(); // use the students object to populate the DOM for the table
        //populateItems();
    } else {
        console.log("There was a problem with the request.");
    }
}

function addprocessData() {
    if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        let data = xhttp.responseText; // Data returned by the AJAX request
        addfridgeItems = JSON.parse(data); // Convert the JSON data to a JavaScript object

        //displayFridges(pageId); // use the students object to populate the DOM for the table
        populateItems();

        //enableButton();
    } else {
        console.log("There was a problem with the request.");
    }
}

function addFridgeData() {
    if (xhttp2.readyState === XMLHttpRequest.DONE && xhttp2.status === 200) {
        let data = xhttp2.responseText; // Data returned by the AJAX request
        fridges2 = JSON.parse(data); // Convert the JSON data to a JavaScript object
        //showFridges();
        console.log('fridges2');
        console.log(fridges2);
        addItem();
        //populateItems();
    } else {
        console.log("There was a problem with the request.");
    }
}

function populateItems(pageId) {
    let grocery = document.getElementById("grocery_items");
    //let addItem = document.createElement("option");
    for (let items of addfridgeItems) {
        console.log(items.name);
        let addItem = document.createElement("option");
        addItem.id = items.type;
        addItem.innerHTML += (items.name + "\n");
        grocery.appendChild(addItem);
    }

}

function displayFridges(pageId) {
    let fridgesSection = document.getElementById("fridges");
    let header = document.createElement("h1");
    header.textContent = "Available fridges";
    fridgesSection.appendChild(header);

    for (let i = 0; i < fridges.length; i++) {
        let fridgeData = document.createElement("div");
        fridgeData.id = "fridge_" + i;

        let fridgeContent = "<img src='images/fridge.svg'></span>";
        fridgeContent += "<span><strong>" + fridges[i].name + "</strong></span>";
        fridgeContent += "<span>" + fridges[i].address.street + "</span>";
        fridgeContent += "<span>" + fridges[i].contact_phone + "</span>"

        // let fridgeContent = `
        //             <img src='images/fridge.svg'></span>
        //             <span><strong> ${fridges[i].name} </strong></span>
        //             <span> ${fridges[i].address.street}</span>
        //             <span> ${fridges[i].contact_phone} </span>
        //             `;

        fridgeData.innerHTML = fridgeContent;
        fridgeData.addEventListener("click", function(event) {
            let fridgeID = event.currentTarget.id.split("_")[1];
            displayFridgeContents(parseInt(fridgeID));
        });

        fridgesSection.appendChild(fridgeData);
    }
}

function displayFridgeContents(fridgeID) {
    document.getElementById("frigeHeading").innerHTML = "Items in the " + fridges[fridgeID].name;
    let bioInformation = "<span id='fridge_name'>" + fridges[fridgeID].name + "</span><br />" + fridges[fridgeID].address.street + "<br />" + fridges[fridgeID].contact_phone;

    document.getElementById("left-column").firstElementChild.innerHTML = bioInformation;
    document.getElementById("meter").innerHTML = "<span style='width: " + (fridges[fridgeID].capacity + 14.2) + "%'>" + fridges[fridgeID].capacity + "%</span>";

    populateLeftMenu(fridgeID);

    let mdElements = "";
    for (const [key, value] of Object.entries(fridges[fridgeID].items)) {
        mdElements += "<div id='item-" + key + "' class='item " + value.type + "'>";
        mdElements += "<img src='" + value.img + "' width='100px' height='100px'; />";
        mdElements += "<div id='item_details'>";
        mdElements += "<p>" + value.name + "</p>";
        mdElements += "<p>Quantity: <span id='qt-" + key + "'>" + value.quantity + "</span></p>";
        mdElements += "<p>Pickup item:</p>";
        mdElements += "</div></div>";
    }
    document.getElementById("middle-column").innerHTML = mdElements;
    document.getElementById("fridges").classList.add("hidden");
    document.getElementById("fridge_details").classList.remove("hidden");
}

function populateLeftMenu(fridgeID) {
    let categories = {};

    for (const [key, value] of Object.entries(fridges[fridgeID].items)) {
        let type = value.type;
        if (type in categories == false) {
            categories[type] = 1;
        } else {
            categories[type]++;
        }
    }

    let leftMenu = document.getElementById("categories");
    for (const [key, value] of Object.entries(categories)) {
        let label = key.charAt(0).toUpperCase() + key.slice(1);
        let listItem = document.createElement("li");
        listItem.id = key;
        listItem.className = "category";
        listItem.textContent = label + " (" + value + ")";

        listItem.addEventListener("click", filterMiddleView);
        leftMenu.appendChild(listItem);
    }
}

function filterMiddleView(event) {
    let elements = document.getElementById("middle-column").children;
    let category = event.target.id;

    for (let i = 0; i < elements.length; i++) {
        let item = elements[i];
        if (!item.classList.contains(category)) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    }
}


let selectItems = document.getElementById("grocery_items");
let numItems = document.getElementById("number_items");
let submitBtn = document.getElementById("submit_btn");
let availableFridges = document.getElementById("view_results");
var text;
var formItem;
/*for (let selectItem of selectItems){
	console.log(selectItem);
	selectItem.addEventListener("click", enableButton);
}*/

function enableButton() {
    //let selectItems = document.getElementById("grocery_items")

    numItems.addEventListener('input', function(event) {
        text = event.target.value;
        if (text > 0 && formItem != null) {
            submitBtn.disabled = false;
            //showFridges();
            //console.log("if1");
        } else {
            submitBtn.disabled = true;
            //console.log("if2");
        }
    });

    selectItems.addEventListener('click', function(event) {
        formItem = event.target.id;
        if (text > 0 && formItem != null) {
            submitBtn.disabled = false;
            //showFridges();
            //console.log("if3");
        } else {
            submitBtn.disabled = true;
            //console.log("if4");
        }
    });

    submitBtn.addEventListener('click', function(event) {
        availableFridges.classList.toggle("hidden");
        availableFridges.innerHTML = "";
        showFridges();

    });


}

function showFridges() {
    //console.log("blabla");
    //addData("http://localhost:8000/js/comm-fridge-data.json")
    //let availableFridges = document.getElementById("view_results");
    let header = document.createElement("h2");
    header.textContent = "Available fridges";
    availableFridges.appendChild(header);
    console.log('fridges2')
    console.log(fridges2)
    console.log(formItem);
    let allCapacity = [];

    for (let i = 0; i < fridges2.length; i++) {

        if (fridges2[i].capacity <= 100 && fridges2[i].accepted_types.includes(formItem) && fridges2[i].can_accept_items > text) {
            let fridgeInfo = document.createElement("div");
            fridgeInfo.id = "fridge_" + i;
            fridgeInfo.className = "fridge";


            // let fridgeIn = "<img src='images/fridge.svg'></span>";
            // fridgeIn += "<span><strong>" + fridges2[i].name + "</strong></span>";
            // fridgeIn += "<span>" + fridges2[i].address.street + "</span>";
            // fridgeIn += "<span>" + "Capacity"+ fridges2[i].capacity + "</span>";
            // fridgeIn += "<span>" + fridges2[i].contact_phone + "</span>"

            let fridgeIn = `
                    <img src='images/fridge.svg'></span>
                    <span><strong> ${fridges2[i].name} </strong></span>
                    <span> ${fridges2[i].address.street} </span>
                    <span> Capacity ${fridges2[i].capacity} </span>
                    <span> ${fridges2[i].contact_phone} </span>
                    `;

            fridgeInfo.innerHTML = fridgeIn;
            availableFridges.appendChild(fridgeInfo);
            allCapacity.push(fridges2[i].capacity);

        }

        /*let fridgeInfo = document.createElement("div");
        fridgeInfo.id = "fridge_" + i;
        fridgeInfo.className = "fridge_" + i;

        let fridgeIn = "<img src='images/fridge.svg'></span>";
        fridgeIn += "<span><strong>" + fridges2[i].name + "</strong></span>";
        fridgeIn	+= "<span>" + fridges2[i].address.street + "</span>";
        fridgeIn += "<span>" + fridges2[i].contact_phone + "</span>"

        fridgeInfo.innerHTML = fridgeIn;
        availableFridges.appendChild(fridgeInfo);*/

    }

    // Finding the best fridge
    const minimumCapacity = Math.min(...allCapacity);
    const lowestCapacityIndex = allCapacity.indexOf(minimumCapacity);
    const highFridge = document.getElementsByClassName('fridge')[lowestCapacityIndex];
    highFridge.style.backgroundColor = "yellow";

    //if(fridges2.capacity <= 100 && )

    /*submitBtn.addEventListener('click', function(event){
    	availableFridges.classList.toggle("hidden");
    });*/

}

/*function recommendBestFridge(){
	for(let i = 0; i < fridges2.length; i++){
		for(const[key, value] of Object.entries(fridges[i].items)){
			if(value.quantity )

		}
	}
	
}*/
let dropBody = document.getElementById("add_items");
let addon = document.getElementById("addItem");
let dropForm = document.getElementById("dropForm");
let headClass = document.getElementById("frigeHeading");

function addItem() {
    let addBtn = document.getElementById("add_btn");
    addBtn.addEventListener('click', function(event) {
        addon.classList.toggle("hidden");
        dropForm.setAttribute("class", "hidden");
        headClass.setAttribute("class", "hidden");
        availableFridges.setAttribute("class", "hidden");
    });
}