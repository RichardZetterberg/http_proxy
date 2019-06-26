var http = require('http');

http.createServer(onRequest).listen(3000);

function onRequest(request, response) {
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
}