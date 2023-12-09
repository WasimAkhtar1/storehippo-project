var express = require('express');
var router = express.Router();
const User = require("../model/usermodel");
const passport = require("passport");
const nodemailer=require("nodemailer")
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('signin.ejs');
});
router.get('/schedule', function(req, res, next) {
  res.render("signin.ejs")
});

router.get('/demo', function(req, res, next) {
  res.render("signin.ejs")
});

router.get('/show', function(req, res, next) {
  res.render("show.ejs")
});


router.get('/more', function(req, res, next) {
  res.render("more.ejs")
});

router.get('/moreone', function(req, res, next) {
  res.render("moreone.ejs")
});

router.get('/btn', function(req, res, next) {
  res.render("btn.ejs")
});

router.get('/explore', function(req, res, next) {
  res.render("explore.ejs")
});

router.get('/explore1', function(req, res, next) {
  res.render("explore1.ejs")
});
router.get('/explore2', function(req, res, next) {
  res.render("explore2.ejs")
});

router.get("/signup",(req,res)=>{
  res.render("signup.ejs")
})

router.get("/signin",(req,res)=>{
  res.render("signin.ejs")
})

// signup

router.post("/signup", async function (req, res, next) {
  try {
      await User.register(
          { username: req.body.username, email: req.body.email,number:req.body.number,message:req.body.message },
          req.body.password 
      );
      res.redirect("/signin");
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});

// signin
router.post(
  "/signin",
  passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/signin",
  }),
  function (req, res, next) {}
);

router.get("/show",(req,res)=>{
  res.render("show")
})

router.get("/login",(req,res)=>{
  res.render("login")
})

// register
router.post("/register", async function (req, res, next) {
  try {
      await User.register(
          { username: req.body.username, email: req.body.email,number:req.body.number,message:req.body.message },
          req.body.password 
      );
      res.redirect("/login");
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});

// login

router.post(
  "/login",
  passport.authenticate("local", {
      successRedirect: "/show",
      failureRedirect: "/login",
  }),
  function (req, res, next) {}
);

// forget page

router.get("/forget",(req,res)=>{
  res.render("forget")
})

router.post("/send-mail", async function (req, res, next) {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.send("User not found");

      sendmailhandler(req, res, user);
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});


// nodemailer

function sendmailhandler(req, res, user) {
  const otp = Math.floor(1000 + Math.random() * 9000);
  // admin mail address, which is going to be the sender
  const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
          user: "wasimlakhtar@gmail.com",
          pass: "ifwb ymou iupz vfls",
      },
  });
  // receiver mailing info
  const mailOptions = {
      from: "wasim Pvt. Ltd.<wasimlakhtar@gmail.com>",
      to: user.email,
      subject: "Testing Mail Service",
      // text: req.body.message,
      html: `<h1>${otp}</h1>`,
  };
  // actual object which intregrate all info and send mail
  transport.sendMail(mailOptions, (err, info) => {
      if (err) return res.send(err);
      console.log(info);
      user.resetPasswordOtp = otp;
      user.save();
      res.render("otp", { admin: req.user, email: user.email });
  });
}

// match otp

router.post("/match-otp/:email", async function (req, res, next) {
  try {
      const user = await User.findOne({ email: req.params.email });
      if (user.resetPasswordOtp == req.body.otp) {
          user.resetPasswordOtp = -1;
          await user.save();
          res.render("newpassword", { admin: req.user, id: user._id });
      } else {
          res.send(
              "Invalid OTP, Try Again <a href='/forget'>Forget Password</a>"
          );
      }
  } catch (error) {
      res.send(error);
  }
});

// resetpassword

router.post("/resetpassword/:id", async function (req, res, next) {
  try {
      const user = await User.findById(req.params.id);
      await user.setPassword(req.body.password);
      res.redirect("/");
  } catch (error) {
      res.send(error);
  }
});


module.exports = router;
