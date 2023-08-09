const http = require("http");
const app = require("./app");
const { connectMongo } = require("./services/mongo");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await connectMongo();
  server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}
startServer();
