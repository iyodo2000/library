const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.send({ token });
};
