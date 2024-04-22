

const mongoose = require('mongoose');
var a = 'mongodb://127.0.0.1:27017/my_database';

// Connection URI
const uri = 'mongodb://127.0.0.1:27017';
//mongodbpassword=a5XKWQsaxKYwk8X7;
//mongodb+srv://kirtitakmoge:a5XKWQsaxKYwk8X7@cluster0.sw5idg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// Database Name
const dbName = 'my_database';
// Define the role data
const roleData = {
  role: "superAdmin",
  privileges: [
    { resource: { db: dbName, collection: "Videos" }, actions: ["find", "insert", "update", "remove"] },
    { resource: { db: dbName, collection: "Hospitals" }, actions: ["find", "insert", "update", "remove"] }
    
  ],
  roles: []
};


// Define the role data
const roleData1= [{
  role: "surgeon",
  privileges: [
    { resource: { db: dbName, collection: "Videos" }, actions: ["insert"] },
    { resource: { db: dbName, collection: "Videos", filter: { surgeonId: "$user._id" } }, actions: ["find"] }
  ],
  roles: []
},
{
  role: "superAdmin",
  privileges: [
    { resource: { db: dbName, collection: "Videos" }, actions: ["find", "insert", "update", "remove"] },
    { resource: { db: dbName, collection: "Hospitals" }, actions: ["find", "insert", "update", "remove"] },
   
  ],
  roles: []
},
{
  role: "hospitalAdmin",
  privileges: [
    // Videos collection access
    { resource: { db: dbName, collection: "Videos" }, actions: ["find", "update", "remove"] },
    { resource: { db: dbName, collection: "Videos", filter: { hospitalId: "$user.hospitalId" } }, actions: ["insert"] },
    // Users collection access restricted to hospitalId
    { resource: { db: dbName, collection: "User" }, actions: ["find"] },
    { resource: { db: dbName, collection: "User", filter: { hospitalId: "$user.hospitalId" } }, actions: ["insert", "update", "remove"] }
  ],
  roles: []
}
];

/// Function to create roles in the specified database
async function createRoles() {try {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, // Optionally add this if you encounter deprecation warnings
  });
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
  throw error;
}
  } 

module.exports = createRoles;
// Call the function to create the role

