import server from "./server";

const opts = {
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://nutrivurv-staging.herokuapp.com",
      "http://nutrivurv.com",
      "https://nutrivurv.herokuapp.com",
      "nutrivurv.com"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  };
};

server.start(opts, () => {
  console.log("The server is up!");
});
