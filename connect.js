const http = require("http");
const url = require("url");
const fs = require("fs").promises;
const uid = require("uuid");

let server = http.createServer((request, response) => {
  if (request.method == "GET") {
    let myFullUrl = `${request.headers.host}${request.url}`;
    myFullUrl = myFullUrl.split("/");
    let size = myFullUrl.length;
    var myId = myFullUrl[size - 1];
    var myEndPoint = myFullUrl[size - 2];

    if (request.url == "/") {
      response.write("Welcome to the home page!");
      response.end();
    } else if (request.url == "/html") {
      fs.readFile("./index.html", "utf8").then((data) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(data);
      });
      response.end();
    } else if (request.url == "/json") {
      let obj = {
        slideshow: {
          author: "Yours Truly",
          date: "date of publication",
          slides: [
            {
              title: "Wake up to WonderWidgets!",
              type: "all",
            },
            {
              items: [
                "Why <em>WonderWidgets</em> are great",
                "Who <em>buys</em> WonderWidgets",
              ],
              title: "Overview",
              type: "all",
            },
          ],
          title: "Sample Slide Show",
        },
      };

      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(obj));
      response.end();
    } else if (request.url == "/uuid") {
      let myUid = uid.v4();
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ uuid: myUid }));
      response.end();
    } else if (myEndPoint == "status") {
      try {
        response.writeHead(myId, { "Content-Type": "text/html" });
        response.write(`Return a response with ${myId} status code`);
        response.end();
      } catch (err) {
        response.writeHead(400, { "Content-Type": "text/html" });
        response.write("Status code is invalid");
        response.end();
      }
    } else if (myEndPoint == "delay") {
      setTimeout(() => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(`Return a response with ${myId} sec of delay`);
        response.end();
      }, myId * 1000);
    }
  }
});
let port = 8000;
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
