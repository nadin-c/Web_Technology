var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');

  if (req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var params = querystring.parse(body);
      var username = params["username"];
      var id = params["id"];
      var branch = params["branch"];
      var mobileNo = params["phno"];
      var gender = params["gender"];
      var branchadd = params["branchadd"];

      var htmlResponse = `
            <!DOCTYPE html>
            <html>
            
            <head>
                <title><b>User Details</b></title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            
            <body>
                <div class="container">
                    <h2 class="text-center text-danger">User Details</h2>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Field</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>${username}</td>
                            </tr>
                            <tr>
                                <td>ID</td>
                                <td>${id}</td>
                            </tr>
                            <tr>
                                <td>Branch</td>
                                <td>${branch}</td>
                            </tr>
                            <tr>
                                <td>Mobile No</td>
                                <td>${mobileNo}</td>
                            </tr>
                            <tr>
                                <td>gender</td>
                                <td>${gender}</td>
                            </tr>
                            <tr>
                                <td>branch address</td>
                                <td>${branchadd}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
            
            </html>
            
      `;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(htmlResponse);
      res.end();
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
}

http.createServer(onRequest).listen(6070);
console.log('Server is running...');