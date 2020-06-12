const server = require('./api/server');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 server running on localhost:${PORT} 🚀`);
});
