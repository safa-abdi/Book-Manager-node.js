const http = require("http");
const app = require("./app");
const port = process.env.Port || 5100;
app.set("port", port);
const server = http.createServer(app);

server.listen(port, () => console.log("listening on " + port));
