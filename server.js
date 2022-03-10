const app = require('./app');

//Starting the server
app.listen(serverConfig.PORT, () => {
   console.log(`Application started on the port no : ${serverConfig.PORT}`);
});