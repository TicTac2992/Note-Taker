//REQUIRE

const db = require("../db/db.json");
var fs = require("fs");

//=============================================================================
//ROUTING
//=============================================================================

module.exports = function(app) {
  //API GET request
  app.get("/api/notes", function(req, res) {
    res.json(db);
  });

  //Post request
  app.post("/api/notes", function(req,res) {
    //within this function allow save to request body, and THEN add it to db.json file
    db.push(req.body);

    //add unique identifier to each note (so you can select individually if needed)
    //forEach loop
    db.forEach((obj, i) => {
      obj.id = i + 1;
    })

    //now return the new note to the client
    fs.writeFile("./db/db.json", JSON.stringify(db), function() {
      res.json(db);
    })
  });
    //API delete request
    app.delete("/api/notes/:id", function(req, res) {
          var id = req.params.id;

    //splice deletes the selected note from the db array
    db.splice(id - 1, 1);

        //reassign id for each note object
        db.forEach((obj, i) => {
          obj.id = i + 1;
        });
      

  //return remaining notes to client
      fs.writeFile("./db/db.json", JSON.stringify(db), function (){
          res.json(db);
      });
    });
  };