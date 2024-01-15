const mongoose = require('mongoose');
const userModel = require('../modal/userModal');
const taskModel = require('../modal/taskModal');


// Connection URI
const uri = 'mongodb://localhost:27017/test';


function updatedTwoColection(params) {
    
// Create a Mongoose connection
const connection = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Open the connection
connection.on('open', () => {
  console.log('Mongoose connection opened');

  // Create a Mongoose session
  const session = connection.startSession();
  userModel.userModel.updateOne({email : "uk@yopmail.com"}, { $set: { name : "IOIOIO"} })
    .session(session)
    .then(async () => {
        //here we updated second collection 
         await taskModel.taskModel.updateOne({title : "Test"}, { $set: { status : 2} });

       await session.commitTransaction();
       return true;
    })

    .then(() => {
      console.log('Transaction committed successfully');
    })
    .catch((error) => {
      console.error('Error in transaction:', error);
    })
    
});

// Handle connection errors
connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});

}



module.exports = {
    updatedTwoColection
}