const mongoose = require('mongoose');
const { Schema } = mongoose;
const Department=require("./Department");
// Define schema for cameras collection
const cameraSchema = new Schema(
    {
   
   
    ipAddress:
     {
        type: String,
        required: [true,"Please Enter IP Address"],
    
        validate: {
            validator: function(value) {
                // Regular expression to validate IP address
                return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(value);
            },
            message: props => `${props.value} is not a valid IP address. Please enter a valid IP address in the format xxx.xxx.xxx.xxx.`
        },
    },
    deviceId: 
    {
        type: String,
        required:[true,"Please Enter Camera device Id"],
        unique:true,

    },
    streamKey: 
    {
        type: String
    },
    departmentId: 
    { 
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Department', 
         required: true },
    link: 
    {
        type: String
    },
    bucketName:
    {
        type: String
    }
},
 {
    toJSON: { virtuals: true }, // Enable virtuals for toJSON serialization
    id: false, // Prevent inclusion of the default '_id' field in toJSON serialization
  }
);
cameraSchema.virtual("cameraId").get(function()
{
    return this._id.toHexString();
})

// Create a model for the cameras collection
const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;
