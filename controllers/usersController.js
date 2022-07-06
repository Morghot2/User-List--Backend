const getUsers = (req, res) => {
  res.status(200).json({ message: "Get users" });
};
const updateUser = (req, res) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
};
const addUser = (req, res) => {
  res.status(200).json({ message: "Set user" });
};
const deleteUser = (req, res) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
};

module.exports = {
    getUsers,
    updateUser,
    addUser,
    deleteUser
}