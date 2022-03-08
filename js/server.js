const http = require("http"); // import the http module, so that we can create a web server
const file = require("fs"); // import the fs (file system) module so that we read and write data to files
const url = require("url"); // import the url module so we can parse the web address of the request into readable parts


const host = "localhost"; // address of the server; localhost means that the server is referring to itself and is not accessible from the internet
const port = 8000; // port most commonly used by webservers

const server = http.createServer(processRequest);

server.listen(port, host, () => { // Bind the port and host to the server
    console.log("Server is running!");
});

function processRequest(request, response){

    if(request.url === "/index.html"){
      // read an HTML file
        file.readFile('../index.html', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, { "Content-Type": "text/html"});
                response.end();
                return;
            }
            response.writeHead(200, { "Content-Type": "text/html"});
            response.end(contents);
        });
    }
    else if(request.url === "/drop.html"){
        // read an HTML file
        file.readFile('../drop.html', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, { "Content-Type": "text/html"});
                response.end();
                return;
            }
            response.writeHead(200, { "Content-Type": "text/html"});
            response.end(contents);
        });
    }
    else if(request.url === "/view_pickup.html"){
        // read an HTML file
        file.readFile('../view_pickup.html', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, { "Content-Type": "text/html"});
                response.end();
                return;
            }
            response.writeHead(200, { "Content-Type": "text/html"});
            response.end(contents);
        });
    }
    else if(request.url === "/css/comm-fridge.css"){
      // read an HTML file
        file.readFile('../css/comm-fridge.css', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, { "Content-Type": "text/css"});
                response.end();
                return;
            }
            response.writeHead(200, { "Content-Type": "text/css"});
            response.end(contents);
        });
    }
    else if(request.url === "/js/comm-fridge-data.js"){
      // read an HTML file
        file.readFile('comm-fridge-data.js', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, {"Content-Type": "application/javascript"});
                response.end();
                return;
            }
            response.writeHead(200, { "Content-Type": "application/javascript"});
            response.end(contents);
        });
    }
    else if(request.url === "/js/comm-fridge.js"){
        // read an HTML file
        file.readFile('comm-fridge.js', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, {"Content-Type": "application/javascript"});
                response.end();
                return;
            }
            response.writeHead(200, { "Content-Type": "application/javascript"});
            response.end(contents);
        });
    }
    else if(request.url == "/js/comm-fridge-data.json"){
      // read a JSON file
        file.readFile('comm-fridge-data.json', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, {"Content-Type": "application/json"});
                response.end();
                return;
            }
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(contents);
        });
    }
    else if(request.url == "/js/comm-fridge-items.json"){
        // read a JSON file
        file.readFile('comm-fridge-items.json', 'utf8', function(err, contents) {
            if(err){
                response.writeHead(500, {"Content-Type": "application/json"});
                response.end();
                return;
            }
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(contents);
        });
    }
    else if(request.url.indexOf(".jpeg") > -1){
        console.log("Image requested!");
    
        let location = ".." + request.url;
        console.log(location);
    
        file.readFile(location, function(err, contents) {
            if(err){
                response.writeHead(500, {"Content-Type": "image/jpeg"});
                response.end();
                return;
            }
            response.writeHead(200, {"Content-Type": "image/jpeg"});
            response.end(contents);
        });
    }
    else if(request.url.indexOf(".svg") > -1){
        console.log("Image requested!");
    
        let location = ".." + request.url;
        console.log(location);
    
        file.readFile(location, function(err, contents) {
            if(err){
                response.writeHead(500, {"Content-Type": "image/svg+xml"});
                response.end();
                return;
            }
            response.writeHead(200, {"Content-Type": "image/svg+xml"});
            response.end(contents);
        });
    }
}