

const mongoose = require('mongoose');



require('dotenv').config();
const uri = process.env.DATABASE_CONNECTION_STRING||"mongodb+srv://kirtitakmoge:oAtKVO2u37fK9VdS@cluster0.khpemdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
/// Function to create roles in the specified database
async function connectDatabase() {try {
    console.log(uri);
  await mongoose.connect(uri, {
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

module.exports = connectDatabase;
// Call the function to create the role

