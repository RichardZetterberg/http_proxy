//connecting main modules
var http = require('http');
var net = require('net');
var url = require('url');

http.createServer(function (request, response){//create server listened on port 3000
	
	var elect = url.parse(request.url);//parse the address bar 
	//object of options 
 	var options = { 	
   		hostname: elect.hostname,
    		port: 80,
    		path: request.url,
    		method: request.method,
    		headers: request.headers
 	};
	
	
	if (elect.hostname == 'http'){//choose between 'http' and 'https' functions. If another then catch mistake 
		
	console.log('serve: ' + request.url);//log reference on requested object
		
	//reproduce the query
  	var proxy = http.request(options, function (res) {
    	response.writeHead(res.statusCode, res.headers)

    	res.pipe(response, {
      			end: true
    		});
  	});

  	request.pipe(proxy, {
    	end: true
  	});
		
	
	//checking for hostname 'https'
	}else if (elect.hostname == 'https'){
    		var proxyRequest = http.request(options);

    		proxyRequest.on('response', function (proxyResponse) {
        	response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
			
        	proxyResponse.on('data', function (chunk) {
           		response.write(chunk, 'binary');
        	});
			
        	proxyResponse.on('end', function () {
            		response.end();
        	});
    	});

    	request.on('data', function (chunk) {
        	proxyRequest.write(chunk, 'binary');
   	});
    	request.on('end', function () {
       		proxyRequest.end();
    	});

});

	server.on('connect', function (request, socketRequest, head) {

    	var fromURL = url.parse('http://' + request.url);

    	var socket = net.connect(fromURL.port, fromURL.hostname, function() {
        	// Tell the client that the connection is established
        	socket.write(head);
        	socketRequest.write("HTTP/" + request.httpVersion + " 200 Connection established\r\n\r\n");
   	})

    	//Host Tunneling
    	socket.on('data', function (chunk) {socketRequest.write(chunk);});
    	socket.on('end', function () {socketRequest.end();});
    	socket.on('error', function () {
        //Tell the client that an error has occurred
        socketRequest.write("HTTP/" + request.httpVersion + " 500 Connection error\r\n\r\n");
        socketRequest.end();
    	})

    	//Client Tunneling
    	socketRequest.on('data', function (chunk) {socket.write(chunk);});
    	socketRequest.on('end', function () {socket.end();});
    	socketRequest.on('error', function () {socket.end();});

	})

	server.listen(8080);//server listening on port: 8080
		
	//if anything else error on console	
	}else console.log('Error. Something went wrong!!!');
}).listen(3000);


