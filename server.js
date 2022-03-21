const app = require('./app');
const serverConfig = require('./configs/server.config');

//Starting the server
app.listen(serverConfig.PORT, () => {
   console.log(`Application started on the port no : ${serverConfig.PORT}`);
});