const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength :[3,"the {PATH} must be at least 3 characters"],
      trim : true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength :[3,"the {PATH} must be at least 3 characters"],
      trim : true
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, "Email already exists"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: 'Please enter a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be atleast 8 characters or longer'],
    },
    image:{
      type: String,
      default:"https://i.pinimg.com/564x/85/59/09/855909df65727e5c7ba5e11a8c45849a.jpg"
    },
    imageCouv:{
      type: String,
      default:"https://images.pexels.com/photos/507410/pexels-photo-507410.jpeg"
    },
    bio: {
      type: String,
    },
    post:[{ type: mongoose.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

module.exports.User = mongoose.model('User', UserSchema);
