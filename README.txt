# CommunityFridge_WebApplication
Created by : Md Ishraq Tanzim
Date       : February, 2022

An interactive web application containing community fridges where users can pick an item or drop off an item.

1) A simple web server has been created called server.js using Node.js which will serve all the resources associated with the web application.

2) The list of products in the drop‐down list in drop.html are dynamically generated from the comm‐fridge‐items.json JSON file.

3) After the user has selected an item from the drop‐down list AND they have specified the quantity of the items to be dropped off, the “Find fridges” button becomes enabled. 
   By default, this should be disabled. This button also becomes disabled if at any point, the selection from the drop‐down list or the value in the “Number of items” text field 
   are removed (i.e., both form fields do not have a value).
   
4) When the “Find fridges” button is clicked, the system shows a list of available fridges which can take the item selected by the user. A fridge can take a specific item 
   if the following conditions are met:
	◦ The fridge is NOT at 100% capacity AND 
	◦ The type of the item selected matches the types of items that the fridge can receive AND
	◦ The fridge can take the quantity of the items specified (e.g., the can_accept_items field of the fridge in the comm‐fridge-data.json file is greater than the quantity 
	  of the items specified by the user.
	  
5) Out of the available fridges, the system recommends the best fridge for receiving the item. Specifically, the system visually highlights the fridge which is the best candidate 
   for receiving the item (e.g., by changing the background colour). The following criteria determines the best fridge for receiving the item:
	◦ The fridge has the least quantity of the item selected by the user
	◦ If two fridges have the same quantity of the item, then the fridge with the lowest capacity (e.g., is most in need of items) is recommended.
	
6) When the “Add an item” is selected, the user is presented with a new screen for adding an item.
