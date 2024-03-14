const mongoose = require('mongoose');

const Uri = "mongodb+srv://adebayooluwaferanmi112:Isrealight@cluster0.jimol0n.mongodb.net/student_db?retryWrites=true&w=majority"


mongoose.connect(Uri)
    .then((response) => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });



const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  otp: String,
  otpExpiration: Date
});

adminSchema.pre('save', function(next) {
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

adminSchema.methods.matchPassword = function(enteredPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, this.password)
      .then(isMatch => resolve(isMatch))
      .catch(err => reject(err));
  });
};


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
