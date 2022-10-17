const http = require("http");


const users = [
  "ADent",
  "FordP",
  "Zaphod",
  "Trillian",
  "Marvin Paranoid Android"
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter User</title></head>");
    res.write("<body>")
    res.write("<h1>This is for inputting users:</h1>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add</button></form>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>User List</title></head>");
    res.write("<body>");
    res.write("<h1>This is the list of users:</h1>");
    res.write("<ul>");
    for (const user of users) {
        res.write(`<li>${user}</li>`);
    }
    res.write("</ul>");
    res.write('<p>Get back to the main page: <a href="/">Main</a></p>');
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      //console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const newUser = parsedBody.split("=")[1];
      users.push(newUser);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Page not Found</title></head>");
  res.write("<body><h1>This page does not exist!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
