const router = require("express").Router(); // module
const Header = require("../models/headerTable");
const Query = require("../models/query");
const Userreg = require("../models/userreg");

let sess = null;

function handlelogincheck(req,res,next){
  if(req.session.isAuth){
    next()

  }else{
    res.redirect('/login')
  }
}

function handlerole(req,res,next){
  if(sess.role =='pvt'){
    next();
  }else{
    res.send('you do not have a rights')
  }
}

router.get("/", async (req, res) => {
  const headerRecord = await Header.findOne();
  // console.log(headerRecord);

  res.render("index.ejs", { headerRecord: headerRecord });
});

router.get("/banner",handlelogincheck, handlerole,async (req, res) => {
  const headerRecord = await Header.findOne();
  res.render("banner.ejs", { headerRecord: headerRecord ,username:sess.username});
});

router.post("/query", async (req, res) => {
  const { query, email } = req.body;
  const status = "unread";
  const queryRecord = new Query({ query: query, email: email, status: status });
  await queryRecord.save();
  res.redirect("/");
});

// test url

router.get("/test", async (req, res) => {
  const title = "Nik collections";
  const shortDes = "all types of dresses are aviable here";
  const longDes = "more details";
  // console.log(title);

  const headerRecord = new Header({
    title: title,
    shortDes: shortDes,
    longDes: longDes,
  });
  await headerRecord.save();
});

router.get("/login", (req, res) => {
  res.render("loginfront.ejs");
});

router.post("/loginfront", async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();

  const userExist = await Userreg.findOne({ username });
  if (userExist) {
    if (userExist.password === password) {
      if (userExist.status === "active") {
        req.session.isAuth = true;            //session 
        sess = req.session;
        sess.role = userExist.role;
        sess.username=userExist.username
        console.log(sess.role);
        res.redirect("/banner");
      } else {
        res.redirect("/login");
      }
    } else {
      // alert("incorrect password, plz try again");
      res.redirect("/login");
    }
  } else {
    // alert("user does not exist");
    res.redirect("/login");
  }
});

router.get("/reg", (req, res) => {
  res.render("regfront.ejs");
});

router.post("/regfront", async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  const status = req.body;

  const userExist = await Userreg.findOne({ username });
  if (userExist) {
    alert("User Already Exists !!");
    res.redirect("/reg");
  } else {
    const userRecord = new Userreg({
      username: username,
      password: password,
      status: "inactive",
      role:'publuc'
    });
    userRecord.save();
    res.redirect("/login");
  }

  // console.log(userRecord);
});

module.exports = router;
