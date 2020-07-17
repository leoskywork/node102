//a sample without express, ref https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

const AppConst = require('./common/app-const');
const config = require('./common/config');

const http = require('http');

//server type is EventEmitter
const server = http.createServer((request, response) => {
    //all headers are represented in lower-case, also have rawHeaders whose contents are the same as the client passed in
    const { method, url, headers } = request;
    console.log('handle request', method, url);

    //If you don't have a listener for that event, the error will be thrown, which could crash your Node.js program.
    //You should therefore add an 'error' listener on your request streams, even if you just log it and continue on your way.
    //(Though it's probably best to send some kind of HTTP error response. More on that later.)
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end('server send back 400 error');
    });

    response.on('error', (err) => {
        console.error(err);
    });

    //-------------------------------------------------------------------routing

    if (method === "GET" || method === "DELETE") {

        if (method === "GET") {
            if (url === '/introspection/config') {
                return response.end(config.readIntrospectionSync());
            }
        }

        response.end(`server received request ${method}, ${url}`);

    } else if (method === "POST" || method === "PUT") {

        //routing, can do this by packages 'express' or 'router'
        if (url === '/echo') {
            request.pipe(response);
            return;
        }

        //read request body(assume body is a string), can do this by package 'concat-stream' or 'body'
        let body = [];
        request.on('data', (chunk) => body.push(chunk));
        request.on('end', () => {

            body = Buffer.concat(body).toString()

            //todo

        });
    } else {
        response.statusCode = 404;
        response.end(`unsupported http method: ${method}`);
    }

});

const port = process.env.PORT || AppConst.port;
server.listen(port, () => console.log(`listening on port ${port} ...`));

