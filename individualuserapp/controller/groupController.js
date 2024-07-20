const Group = require('../models/Group');
const User = require('../models/User');
const Membership = require('../models/Membership');

const createGroup = async (req, res) => {
    try {
        const { name, description, ownerId } = req.body;

        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const group = new Group({
            name,
            description,
        });

        await group.save();

        const membership = new Membership({
            user: user._id,
            group: group._id,
            role: 'owner',
        });

        await membership.save();
        console.log("group created successfully")
        res.status(201).json({group,message:"group created succesfully",success:true});
    } catch (error) {
        res.status(500).json({ error: 'Server error',success:false });
    }
};

const addMemberToGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { memberId } = req.body;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingMembership = await Membership.findOne({ user: user._id, group: group._id });
        if (existingMembership) {
            return res.status(400).json({ error: 'User is already a member' });
        }

        const membership = new Membership({
            user: user._id,
            group: group._id,
            role: 'member',
        });

        await membership.save();

        res.status(200).json({membership,message:"User successfully added to group",success:true});
    } catch (error) {
        res.status(500).json({ error: 'Server error',success:false });
    }
};
const getAllUsersOfGroup = async (req, res) => {
    try {
        const { groupId } = req.params;

        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Find all memberships for the given group
        const memberships = await Membership.find({ group: groupId }).populate('user', '-password'); // Excluding password field

        // Extract user information from memberships
        const users = memberships.map(membership => membership.user);

        res.status(200).json({users,success:true});
    } catch (error) {
        res.status(500).json({ error: 'Server error' ,success:false});
    }
};
const removeUserFromGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.params;
  
        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        console.log(group);

        // Check if the user is a member of the group
        const membership = await Membership.findOne({ group: groupId, user: userId });
        if (!membership) {
            return res.status(404).json({ error: 'User is not a member of the group' });
        }
      console.log(membership);
        // Remove the membership from the group
        await membership.deleteOne();
  console.log("User removed from group successfully");
        res.status(200).json({ message: 'User removed from group successfully',success:true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' ,success:false});
    }
};

module.exports = {
    createGroup,
    addMemberToGroup,
    getAllUsersOfGroup,
    removeUserFromGroup,
};
