
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send verification email
function usersendVerificationEmail(user) {
  // You'll need to configure your email transport here
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adebayooluwaferanmi112@gmail.com',
      pass: '45625813'
    }
  });

  const mailOptions = {
    from: 'adebayooluwaferanmi112@gmail.com',
    to: user.email,
    subject: 'Email Verification',
    text: `Verification code: ${user.verificationCode}`
  };

  return transporter.sendMail(mailOptions);
}

// Function to send OTP
function usersendOTP(user) {
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiration = new Date(Date.now() + 600000); // OTP expires in 10 minutes
  return user.save()
    .then(() => {
      // Send OTP via email or SMS
      console.log(`Your OTP: ${otp}`);
    });
}

module.exports = {
  usersignUp: (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, password });
        newUser.save()
          .then(user => {
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            user.verificationCode = verificationCode;
            return user.save();
          })
          .then(user => sendVerificationEmail(user))
          .then(() => {
            res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
          })
          .catch(err => {
            console.error(err.message);
            res.status(500).send('Server Error');
          });
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error');
      });
  },

  usersignIn: (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(400).json({ message: 'Invalid credentials' });
            }

            if (!user.isVerified) {
              return res.status(400).json({ message: 'Email not verified' });
            }

            // You can return a JWT token for authentication here

            res.status(200).json({ message: 'User signed in successfully' });
          })
          .catch(err => {
            console.error(err.message);
            res.status(500).send('Server Error');
          });
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error');
      });
  },

  usersendVerification: (req, res) => {
    const { email } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }

        usersendVerificationEmail(user)
          .then(() => {
            res.status(200).json({ message: 'Verification email sent successfully' });
          })
          .catch(err => {
            console.error(err.message);
            res.status(500).send('Server Error');
          });
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error');
      });
  },

  usersendOTP: (req, res) => {
    const { email } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }

        usersendOTP(user)
          .then(() => {
            res.status(200).json({ message: 'OTP sent successfully' });
          })
          .catch(err => {
            console.error(err.message);
            res.status(500).send('Server Error');
          });
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error');
      });
  }
};
