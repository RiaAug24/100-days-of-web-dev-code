const http = require("http");

handleRequest = (request, response) => {
  //Function to handle incoming requests on the server

  if (request.url === '/currenttime') {
    response.statusCode = 200;
    response.end('<h1>'+ new Date().toISOString() +'</h1>')
  }
  else if (request.url === '/') {
  response.statusCode = 200;
  response.end('<h1>running local server...</h1>')
  }

};

const server = http.createServer(handleRequest);

server.listen(3000); //Development Server
