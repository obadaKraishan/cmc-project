const User = require('../models/User');
const Role = require('../models/Role');

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').populate('role');
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Assign a role to a user
// @route PUT /api/users/:id/role
// @access Private/Admin
const assignRoleToUser = async (req, res) => {
  const { roleId } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.role = roleId;
      const updatedUser = await user.save();
      return res.json(updatedUser);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Get all roles
// @route GET /api/roles
// @access Private/Admin
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Create a new role
// @route POST /api/roles
// @access Private/Admin
const createRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const roleExists = await Role.findOne({ name });

    if (roleExists) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const role = new Role({
      name,
      permissions,
    });

    const createdRole = await role.save();
    return res.status(201).json(createdRole);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Delete a role
// @route DELETE /api/roles/:id
// @access Private/Admin
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (role) {
      await role.remove();
      return res.json({ message: 'Role removed' });
    } else {
      return res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  assignRoleToUser,
  getAllRoles,
  createRole,
  deleteRole,
};
