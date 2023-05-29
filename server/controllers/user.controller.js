const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ADD NEW USER
module.exports.Register = async (req, res) => {
  try {
    const logUser = await User.findOne({ email: req.body.email });
    // CHECK IF USER EXIST
    if (logUser) {
      res.status(400).json({ msg: 'Email already exist' });
    } else {
      User.create(req.body)
        .then((user) => {
          // TOKEN
          const payload = {
            id: user._id,
          };

          const token = jwt.sign(payload, 'supersecret', {
            expiresIn: '10d',
          });
          res.status(200).json({ user, token });
        })
        .catch((err) => res.status(400).json(err));

      // return res.json({ user, token });
    }
  } catch (error) {res.status(400).json(error.errors);
    console.log(error.errors);
  }
};

// LOGIN
module.exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: 'Email not found' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Wrong password' });
    }
    // TOKEN
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, 'supersecret', {
      expiresIn: '10d',
    });

    return res.json({ user, token });
  } catch(error){res.status(400).json(error.errors)}
};

// GET ALL USERS
module.exports.GetAllUsers = (req, res) => {
  User.find({} ,"-password")
    .then((users) => res.json( users ))
    .catch((err) => res.status(400).json({ msg: 'Something went wrong', err }));
};

// get user by id
module.exports.GetUserById = (req, res) => {
  User.findById(req.params.id)
  .then((user) => res.json(user))
  .catch((err) => res.status(400).json({ msg: 'user not found', err }))


}
// edit user by id

module.exports.EditUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id)
  const url=req.protocol+'://'+req.get('host');
  const newUser = new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      image: req.file ? url + '/' + req.file.filename : null,
      imageCouv:req.file ? url + '/' + req.file.filename : null,
      bio : req.body.bio
      
    }
  );
  newUser.save()
  .then((user) => res.json(user))
  .catch((err) => res.status(400).json({ msg: 'error updating user', err }))

};

// GET CONNECTED USER
module.exports.GetConnectedUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    res.status(400).json({ msg: 'User not exist' });
  }
  return res.json(user);
};
