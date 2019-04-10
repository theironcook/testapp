const {NextFunction, Request, Response, Router} = require('express');

class PersonRouter {

  constructor() {
    this.router = Router();
    this.setRoutes();

    // these would live in Mongo
    this.persons = [{id: 1, name: 'Kijana Carter'}, 
                    {id: 2, name: 'Kerry Collins'},
                    {id: 3, name: 'Bobby Engram'}];    

    this.idCount = 4;
  }

  setRoutes() {
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:objectID', this.get.bind(this));
    this.router.post('/', this.create.bind(this));
    // this.router.put('/:objectID', this.update.bind(this));
    // this.router.delete('/:objectID', this.delete.bind(this));
  }

  // really belong in a controller layer but I just don't give a poo right now, git er done
  async getAll(req, res, next){    
    res.json(this.persons);
  }

  get(req, res, next){
    res.send(JSON.stringify(this.persons[req.params.objectID]));
  }
  
  create(req, res, next){
    const newPerson = {id: this.idCount++, name: req.body.name};
    this.persons.push(newPerson);
    res.json(newPerson);
  }
}

module.exports = {
  PersonRouter
}