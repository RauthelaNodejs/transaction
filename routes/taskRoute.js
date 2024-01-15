const express = require('express');
const taskRoute = express.Router();
const taskController = require('../controller/taskController')
const {authToken} = require('../middleware/authnticate')


taskRoute.post("/",[authToken],taskController.createTask);
taskRoute.get("/",[authToken],taskController.getAllTask);
taskRoute.get("/byId",[authToken],taskController.getTask);
taskRoute.put("/",[authToken],taskController.updateTask);
taskRoute.delete("/",[authToken],taskController.removeTask);









module.exports = {
    taskRoute
}