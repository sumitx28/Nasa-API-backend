const router = require('express').Router();
const { User, validate } = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.find({ email: req.body.email });
    if (user.length != 0)
      return res
        .status(409)
        .send({ message: 'User with given email already exists' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();

    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
