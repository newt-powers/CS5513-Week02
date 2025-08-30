/* index.js */
/* based off of the tutorial here: https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module */

//load the http module
const http = require("http");

//load core fs module
const fs = require("fs").promises;

//define the host and port
const host = "localhost";
const port = 8000;

//request listener to handle and return HTTP requests
//request, response
//FACTOR DOWN!!
const requestListener = function(req, res) {
    if(req.url === '/') {
        console.log("loading html");
        fs.readFile(__dirname + '/tails.html').then(
            //function(content){...}
            content => {
                res.setHeader("Content-Type", "text/html; charset=UTF-8");
                //return 200 OK http status code
                res.writeHead(200);
                //send back content of html file
                res.end(content);
            }
        );
    } else {
        console.log("loading html");
        //if not root return json
        //when typing localhost:8000/headmates.json it returns the text for tails.
        fs.readFile(__dirname + '/headmates.json').then(
            //function(content){...}
            content => {
                res.setHeader("Content-Type", "application/json; charset=UTF-8");
                //return 200 OK http status code
                res.writeHead(200);
                //send back content of html file
                res.end(content);
            }
        );
    }




    //     res.writeHead(200, {"ContentType": "text/plain"}); //status code "OK"
    //     res.end("My first server!\n");
    // } else if(req.url === '/brewcoffee') {
    //     res.writeHead(418);
    //     res.end(`I'm a little teapot!!\n`);
    // } else if(req.url === '/pizza') {
    //     res.writeHead(202);
    //     res.end("Pizzaaaaa!!!!!\n");
    // }

};

//server obj accepts http requests, passes to requestListener()
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});