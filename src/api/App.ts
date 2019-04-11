const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
import { PersonRouter } from './routes/PersonRouter';

// Create a new express application instance
const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

class AppBuilder {

  constructor(private readonly app: any){
    this.setUpMiddleware();
    this.setUpRoutes();
  }

  setUpMiddleware(){
    //this.setUpMongoLib();
    app.use(express.static(path.join(__dirname, 'clientapp')));
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