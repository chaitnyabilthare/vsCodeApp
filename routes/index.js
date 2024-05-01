var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

const globlepath = path.join(__dirname, "../", "public", "uplodes");

/* GET home page. */
router.get("/", function (req, res, next) {
  var files = fs.readdirSync(globlepath);

  res.render("index", {
    files: files,
    filename:"",
    filedata:""
  });
});
//
//
router.get("/:filename", function (req, res, next) {

  const filedata = fs.readFileSync(path.join(globlepath, req.params.filename), { encoding: 'utf8', flag: 'r' });

  const files = fs.readdirSync(globlepath);
  res.render("index", {
    files: files,
    filename:req.params.filename,
    filedata:filedata
  });
});
//
//
router.get("/delete/:filename", (req, res) => {

  fs.unlinkSync(path.join(globlepath, req.params.filename));

  res.redirect("/");
});
//
//
router.post("/update/:filename", (req, res) => {
  var filename = req.params.filename;
  
  fs.writeFileSync(
    path.join(globlepath,filename),req.body.filedata
  );
  res.redirect(`/${filename}`);
});
//
//
router.post("/create", function (req, res, next) {
  var filename = req.body.filename;
  fs.writeFileSync(path.join(globlepath, req.body.filename), "");
  res.redirect(`/${filename}`);
});

module.exports = router;
