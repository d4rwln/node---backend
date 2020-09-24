const express = require('express');
const routes = express.Router();

const ProjectController = require('./controllers/ProjectController');
const UserController = require('./controllers/UserController');
const middleware = require('./middlewares/auth')


routes.get("/", (req,res)=>{
    return res.send("Server Running")
});



// registro
routes.post("/user", UserController.create)
routes.post("/auth", UserController.authenticate)

//auth
routes.use(middleware);

// Projects
routes.get("/projects/:id", ProjectController.getById);
routes.get("/projects", ProjectController.index);
routes.post("/projects", ProjectController.create);
routes.put("/projects/:id", ProjectController.update);
routes.delete("/projects/:id", ProjectController.remove);


module.exports = routes;