const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const Uri = "mongodb+srv://Edufy_2024:Edufy_2024@cluster2.uezjk2x.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(Uri)
    .then((response) => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });



const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  otp: String,
  otpExpiration: Date
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10)
    .then(salt => {
      bcrypt.hash(this.password, salt)
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

userSchema.methods.matchPassword = function(enteredPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, this.password)
      .then(isMatch => resolve(isMatch))
      .catch(err => reject(err));
  });
};

const user = mongoose.model('User', userSchema);

module.exports = user;
