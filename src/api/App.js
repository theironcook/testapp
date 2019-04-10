const express = require('express');
const bodyParser = require('body-parser');
const { PersonRouter } = require('./routes/PersonRouter');

// Create a new express application instance
const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');  
});
 

class AppBuilder {

  constructor(app){
    this.app = app;
    this.setUpMiddleware();
    this.setUpRoutes();
  }

  setUpMiddleware(){
    //this.setUpMongoLib();
  }

  setUpRoutes() {
    this.app.use('/person', new PersonRouter().router);    
  }
}

new AppBuilder(app);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});