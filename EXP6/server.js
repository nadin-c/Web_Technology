const http = require("http");
const querystring = require("querystring");
const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log(`Error Connecting to MongoDB: ${error}`);
    }
}

connectToMongoDB();

// Get the database and collection
const database = client.db("web-technology-lab");
const collection = database.collection("EXP6");

// Request handler function
const reqHandler = async (req, res) => {
    const path = req.url;
    let query = "";

    // Collect data from the request
    req.on("data", chunk => {
        query += chunk;
    });

    // When all data is received, process the request
    req.on("end", async () => {
        const params = querystring.parse(query);

        let htmlResponse = `
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
        `;
        let statusCode = 200;

        try {
            // Handle different paths
            if (path === "/insert") {
                htmlResponse += await insert(params);
            } else if (path === "/view") {
                htmlResponse += await view();
            } else if (path === "/delete") {
                htmlResponse += await delete_(params);
            } else if (path === "/update") {
                htmlResponse += await update(params);
            } else {
                statusCode = 404;
                htmlResponse += "<h1 class='text-center'>404 Page Not Found</h1>";
            }
        } catch (error) {
            statusCode = 500;
            console.error(error);
            htmlResponse += "<h1 class='text-center'>500 Internal Server Error</h1>";
        }

        htmlResponse += `
                    </div>
                </div>
            </div>
        `;

        res.writeHead(statusCode, { "Content-Type": "text/html" });
        res.end(htmlResponse);
    });
};

// Function to insert data into MongoDB
const insert = async params => {
    await collection.insertOne(params);
    return "<h1 class='text-center text-success'>Data Inserted Successfully</h1>";
};

// Function to view data from MongoDB
const view = async () => {
    let htmlResponse = `
        <table class="table table-bordered table-striped table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Register Number</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Year</th>
                    <th>Department</th>
                </tr>
            </thead>
            <tbody>
    `;
    const documents = await collection.find({}).toArray();

    documents.forEach(document => {
        htmlResponse += `
            <tr>
                <td>${document["Name"]}</td>
                <td>${document["DOB"]}</td>
                <td>${document["Register Number"]}</td>
                <td>${document["Email"]}</td>
                <td>${document["Phone"]}</td>
                <td>${document["Year"]}</td>
                <td>${document["Department"]}</td>
            </tr>
        `;
    });

    htmlResponse += `
            </tbody>
        </table>
    `;

    return htmlResponse;
};

// Function to update data in MongoDB
const update = async params => {
    // Remove empty parameters
    for (const key in params) {
        if (params[key] === "") {
            delete params[key];
        }
    }

    await collection.updateOne({ "Register Number": params["Register Number"] }, { $set: params });
    return "<h1 class='text-center text-primary'>Data Updated Successfully</h1>";
};

// Function to delete data from MongoDB
const delete_ = async params => {
    await collection.deleteOne({ "Register Number": params["Register Number"] });
    return "<h1 class='text-center text-danger'>Data Deleted Successfully</h1>";
};

// Create and start the server
http.createServer(reqHandler).listen(3001, () => console.log("Server is running on port 3001."));
