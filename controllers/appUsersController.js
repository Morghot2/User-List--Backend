const registerUser = (req, res) => {
    res.json({message: "Register User"});
}
const loginUser = (req, res) => {
    res.json({message: "Login user"});
}
const getMe = (req, res) => {
    res.json({message: "User data"});
}
module.exports = {
    registerUser, loginUser, getMe
}
