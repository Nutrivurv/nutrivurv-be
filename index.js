import server from "./server";

const opts = {
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://nutrition-tracker-fe-pt7-dqdkuajes.now.sh",
      "http://nutrivurv.com",
      "https://nutrivurv.herokuapp.com",
      "nutrivurv.com"
    ]
  }
};

server.start(opts, () => {
  console.log("The server is up!");
});
