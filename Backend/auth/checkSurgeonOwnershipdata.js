const { isValidObjectId } = require("mongoose");
const User = require("../models/User");
const chekSurgeonOwnerShipdata = async (req, res, next) => {
  const surgeonId = req.params.surgeonId;
  if (!isValidObjectId(surgeonId)) {
    return res.status(400).json({ error: "Invalid surgeonID" });
}
const surgeonEmail = req.user.email; 
console.log(surgeonEmail)
        // Find the surgeon by email
        const surgeon = await User.findOne({ email: surgeonEmail });
        if (!surgeon) {
            return res.status(404).json({ error: 'Surgeon not found' });
        }
        if (surgeon._id.toString() !==surgeonId.toString()) {
            return res.status(403).json({ error: 'User IDs do not match or not authorized to this data' });
        }

        req.user = surgeon; // Attach the user object to the request for further processing if needed
        next();
};
module.exports = chekSurgeonOwnerShipdata;
