var http = require('http');
var tls = require('tls');
var url = require('url');

http.createServer(function (request, response){
	var elect = url.parse(request.url);
	if (elect.hostname == 'http'){
		console.log('serve: ' + request.url);

 		var options = {
  	 	hostname: 'www.google.com',
    	port: 80,
    	path: request.url,
    	method: request.method,
    	headers: request.headers
  	};

  	var proxy = http.request(options, function (res) {
    	response.writeHead(res.statusCode, res.headers)

    	res.pipe(response, {
      			end: true
    		});
  		});

  	request.pipe(proxy, {
    	end: true
  	});
	}else if (elect.hostname == 'https'){
		var request = Http.request({
   			host: '192.168.5.8',
   			port: 3128,
    		method: 'CONNECT',
    		path: 'twitter.com:443',
		});

		request.on('connect', function (res, socket, head) {
    	var cts = tls.connect({
   			host: 'twitter.com',
    		socket: socket
    	}, function () {
        	cts.write('GET / HTTP/1.1rnHost: twitter.comrnrn');
    	});

    	cts.on('data', function (data) {
        	console.log(data.toString());
    	});
	});

		req.end();
	}else console.log('Error. Something went wrong!!!');
}).listen(3000);


