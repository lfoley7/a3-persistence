const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let appdata = []; // Store our orders

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

function sortAndRankOrders() {
  appdata.sort((a, b) => {
    let aColonPosition = a.deliveryTime.indexOf(":");
    let bColonPosition = b.deliveryTime.indexOf(":");
    const dateA = new Date((new Date().getFullYear()), 1, a.deliveryDate.slice(-4, -2), (Number(a.deliveryTime.slice(0, aColonPosition)) + 12), a.deliveryTime.slice(aColonPosition + 1, aColonPosition + 3));
    const dateB = new Date((new Date().getFullYear()), 1, b.deliveryDate.slice(-4, -2), (Number(b.deliveryTime.slice(0, bColonPosition)) + 12), b.deliveryTime.slice(bColonPosition + 1, bColonPosition + 3));
    return dateA - dateB;
  });

  appdata.forEach((order, index) => {
    order.orderRank = index + 1;
  });
}

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const orderData = JSON.parse(dataString);
    appdata.push(orderData);

    sortAndRankOrders();

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end("Order received and ranked");
  });
};

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/all_orders.html") {
    sendUpdatedOrdersPage(response);
  } else if (request.url === "/orders") {
    sortAndRankOrders();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

const sendUpdatedOrdersPage = function (response) {
  fs.readFile("public/all_orders.html", 'utf8', function (err, content) {
    if (err) {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
      return;
    }

    let ordersHtml = appdata.map(order => {
      return `<tr>
        <td data-field="name" contenteditable="true">${order.name}</td>
        <td data-field="email" contenteditable="true">${order.email}</td>
        <td data-field="address" contenteditable="true">${order.address}</td>
        <td data-field="deliveryInstructions" contenteditable="true">${order.deliveryInstructions}</td>
        <td data-field="phone" contenteditable="true">${order.phone}</td>
        <td data-field="toppings" contenteditable="true">${order.toppings}</td>
        <td data-field="dietary" contenteditable="true">${order.dietary}</td>
        <td data-field="deliveryDate" contenteditable="true">${order.deliveryDate}</td>
        <td data-field="deliveryTime" contenteditable="true">${order.deliveryTime}</td>
        <td data-field="orderRank" contenteditable="true">${order.orderRank}</td>
        <td data-field="paid" contenteditable="true">${order.paid}</td>
        <td data-field="comments" contenteditable="true">${order.comments}</td>
      </tr>`;
    }).join('');

    content = content.replace('<tbody></tbody>', `<tbody>${ordersHtml}</tbody>`);

    response.writeHeader(200, { "Content-Type": "text/html" });
    response.end(content);
  });
};

server.listen(process.env.PORT || port);