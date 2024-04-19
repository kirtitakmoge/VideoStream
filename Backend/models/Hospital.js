const mongoose = require("mongoose");
const { Schema } = mongoose;
// Define schema for hospitals collection
const hospitalSchema = new Schema(
  {
    Hospital_Name: { type: String, required: true },
    location: { type: String },
    email: { 
      type: String, 
      required: [true, "Enter Email Address"], 
      unique: true,
      // Simple email format validation
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email address"]
  },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter a phone number"],
      unique: true,
      validate: {
        validator: function(value) {
            // Regular expression to validate landline phone numbers
            // This regex allows for phone numbers in the format xxx-xxxxxxx or (xxx) xxx-xxxx
            return /^(\d{3}-\d{7}|\(\d{3}\) \d{3}-\d{4})$/.test(value);
        },
        message: props => `${props.value} is not a valid landline phone number. Please enter a valid landline phone number in the format xxx-xxxxxxx or (xxx) xxx-xxxx.`
    },
},
   
  },
  {
    toJSON: { virtuals: true }, // Enable virtuals for toJSON serialization
    id: false, // Prevent inclusion of the default '_id' field in toJSON serialization
  }
);

// Define a virtual property for the custom ObjectId name
hospitalSchema.virtual("hospitalId").get(function () {
  return this._id.toHexString(); // Convert ObjectId to hexadecimal string
});

// Create a model for the hospitals collection

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
