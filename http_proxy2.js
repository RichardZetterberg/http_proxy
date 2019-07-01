//connecting main modules
var http = require('http');
var tls = require('tls');
var url = require('url');

http.createServer(function (request, response){//create server listened on port 3000
	
	var elect = url.parse(request.url);//parse the address bar 
	
	if (elect.hostname == 'http'){//choose between 'http' and 'https' functions. If another then catch mistake 
		
		console.log('serve: ' + request.url);//log reference on requested object
		
		//object of options 
 		var options = { 	
  	 		hostname: 'www.google.com',
    			port: 80,
    			path: request.url,
    			method: request.method,
    			headers: request.headers
  		};
	
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
		var request = Http.request({
   			host: '192.168.5.8',
   			port: 3128,
    			method: 'CONNECT',
    			path: 'twitter.com:443',
		});

		
		
		
		request.on('connect', function (res, socket, head) {
			//accepts an options argument which contains the socket we received from the connect event handler.
    			var cts = tls.connect({
   				host: 'twitter.com',
    				socket: socket
    			}, function () {
        			cts.write('GET / HTTP/1.1rnHost: twitter.comrnrn');
    	});

			
    		cts.on('data', function (data) {//show data
        		console.log(data.toString());
    		});
	});

		req.end();
		
		
	//if anything else error on console	
	}else console.log('Error. Something went wrong!!!');
}).listen(3000);


