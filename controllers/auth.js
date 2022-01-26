const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(200).json({ user: user.name, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login =  async (req, res) => {
    
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    !user && res.status(404).json({ errMsg: "User not registered" });

    const isMatch = await user.comparePassword(password)
    !isMatch && res.status(401).json({errMsg: "Invalid Login credentials"})

    res.status(200).json({user:user.name});
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { login, register };
