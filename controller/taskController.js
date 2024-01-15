const {taskModel} = require('../modal/taskModal');


const createTask = async (req, res) => {
    try {
        let {title,description,status} = req.body;
        let taskExist =await  taskModel.findOne({title : title});
        if(taskExist){
            return res.status(400).json({
                message: "Task already exist",
              });
    
        }
        // let {userId} = req.user; if we want to save userId in task collection
        let createTask = taskModel({title,description,status});
        let result = await createTask.save();
        return res
          .status(200)
          .json({ message: "Task created sucessfully", data: result });
    } catch (error) {
        return res.status(400).json({
            message: "something went wrong",
            error: error,
          });
      
    }
    
}

const getAllTask = async (req, res) => {
    try {
            let taskData = await taskModel.aggregate([
                { "$facet": {
                    "totalData": [
                        {$sort : {created : -1}},
                      { "$skip": 0},
                      { "$limit": 10 }
                    ],
                    "totalCount": [
                      { "$group": {
                        "_id": null,
                        "count": { "$sum": 1 }
                      }}
                    ]
                  }}
            ]);
            if(taskData){
                let obj = {
                    result :taskData[0].totalData,
                    totalCount :taskData[0].totalCount[0].count
                }
    
                    return res
                    .status(200)
                    .json({ message: "Tasks fetched  sucessfully", data: obj });
          
    
                }else{
                   return res
                .status(200)
                .json({ message: "Tasks fetched  sucessfully", data: taskData} );
    
                }
    
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "something went wrong",
                error: error,
              });
          
        }
        
    }


const getTask = async (req, res) => {
        try {
            let {taskId} = req.query;
                let taskData = await taskModel.findOne({_id : taskId})
                if(taskData){
        
                        return res
                        .status(200)
                        .json({ message: "Tasks fetched  sucessfully", data: taskData });
              
        
                    }else{
                       return res
                    .status(404)
                    .json({ message: "Tasks not found"} );
        
                    }
        
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    message: "something went wrong",
                    error: error,
                  });
              
            }
            
        }

 const updateTask = async (req, res)=>{
    try {
        let {taskId,title,description,status} = req.body;
        let update = {};
        let query = {};
        query._id = taskId
        if(title){
            update.title = title;
        }
        if(description){
            update.description = description;
        }
        if(status){
            update.status = status;
        }
        let updateData = await taskModel.findOneAndUpdate(query,update);
        let data =  await taskModel.findOne({_id : taskId})
        if(updateData){
            return res
            .status(200)
            .json({ message: "Task update sucessfully", data: data });
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went wrong",
            error: error,
          });
        
    }
}   

 const removeTask = async (req, res)=>{
    try {
        let {taskId} = req.body;
       
        let deleteTask = await taskModel.findOneAndRemove({_id :taskId});
        if(deleteTask){
            return res
            .status(200)
            .json({ message: "Task deleted sucessfully", data: deleteTask });
        }else{
            return res
            .status(404)
            .json({ message: "Task does not  exist", }); 
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went wrong",
            error: error,
          });
        
    }


 }   


module.exports = {
    createTask,
    getTask,
    updateTask,
    getAllTask,
    removeTask
}


