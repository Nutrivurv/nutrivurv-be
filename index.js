import server from "./server";

const opts = {
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"]
  }
};

server.start(opts, () => {
  console.log("The server is up!");
});
