const fs = require('fs-extra');
const express = require('express');
const fallback = require('express-history-api-fallback');
const pathModule = require('path');
const { Keystone } = require('@keystonejs/keystone');

class RoutesApp {
  constructor({keystone}) {
    this.keystone = keystone;
  }

  build(){
    console.log('this is a miracle!!!!!');
  }
  
  prepareMiddleware({ dev, distDir }) {
    
    const app = express();
    app.get('/fff', async (req, res) => {
      
      
//console.log(this.keystone);

      let data = await this.keystone.executeQuery(
      `query {
        allTodos {
          id
          name
        }
        _allTodosMeta {
          count
        }
        allTests {
          id
        }
      }`
        , {});

      res.json({f:data});

    });
    return app;
  }

  build({ distDir }) {
    
  }
}

module.exports = {
  RoutesApp
};
