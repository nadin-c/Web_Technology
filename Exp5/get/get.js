const http = require('http');
const url = require('url');
const querystring = require('querystring');

function onRequest(req, res) {
  const path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');

  if (req.method === 'GET' && path === '/login') {
    const query = url.parse(req.url).query;
    console.log(query);
    const params = querystring.parse(query);
    const username = params["username"];
    const id = params["id"];
    const branch = params["branch"];
    const mobileNo = params["phno"];
    const gender = params["gender"];
    const branchadd = params["branchadd"];
    const htmlResponse = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <title>User Details</title>
        <!-- Bootstrap CSS -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <style>
            /* Optional: You can keep the custom styles for additional styling */
            h2 {
                text-align: center;
                color: red;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h2 class="mt-5 mb-4">User Details</h2>
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
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
                        <td>Gender</td>
                        <td>${gender}</td>
                    </tr>
                    <tr>
                        <td>Branch Address</td>
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
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
}

http.createServer(onRequest).listen(8090);
console.log('Server is running...');