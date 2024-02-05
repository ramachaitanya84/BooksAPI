//Bring in the express server
let express = require("express");
let app = express();
let retrieve = require("./repos/retrieve");
let insert = require("./repos/insert");
let update = require("./repos/update");
let remove = require("./repos/remove");
let errorHelpers = require("./helpers/errorHelpers");
let cors = require("cors");

//Use the express Router object
let router = express.Router();

//configure middleware to support JSON data parsing in request object
app.use(express.json());

//configure CORS
app.use(cors());

//Create GET to return list
router.get("/", function (req, res, next) {
  retrieve.get(
    function (data) {
      res.status(200).json({
        status: 200,
        message: "All rows sent",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

//Create GET to search for list of data items that match the name passed as querystring.
//This can be updated later to include multiple params - but make sure you update the related search function in repos.
router.get("/search", function (req, res, next) {
  let searchObject = { name: req.query.name };
  retrieve.search(
    searchObject,
    function (data) {
      if (data.length > 0) {
        res.status(200).json({
          status: 200,
          message: "Matching rows sent for name: " + searchObject.name,
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No item found with name: " + searchObject.name,
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

//Create GET to get a single item from list
router.get("/:id", function (req, res, next) {
  retrieve.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          message: "One row sent",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No item with id: " + req.params.id + " found.",
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

//Create POST to update new data
router.post("/", function (req, res, next) {
  insert.addNewRow(
    req.body,
    function (data) {
      res.status(201).json({
        status: 201,
        message: "New rows added",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

//Create PUT tp update existing row of data one item at a time
router.put("/:id", function (req, res, next) {
  retrieve.getById(req.params.id, function (data) {
    if (data) {
      update.updateRow(req.body, req.params.id, function (data) {
        res.status(200).json({
          status: 200,
          message: "Updated line item with id: " + req.params.id,
          data: data,
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        message:
          "The line item " +
          req.params.id +
          " you want to update is not found.",
      });
    }
  }),
    function (err) {
      next(err);
    };
});

//Create PATCH tp update existing row of data one item at a time
router.patch("/:id", function (req, res, next) {
  retrieve.getById(req.params.id, function (data) {
    if (data) {
      update.updateRow(req.body, req.params.id, function (data) {
        res.status(200).json({
          status: 200,
          message: "Updated line item with id: " + req.params.id,
          data: data,
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        message:
          "The line item " +
          req.params.id +
          " you want to update is not found.",
      });
    }
  }),
    function (err) {
      next(err);
    };
});

//Create DELETE tp update existing row of data one item at a time
router.delete("/:id", function (req, res, next) {
  retrieve.getById(req.params.id, function (data) {
    if (data) {
      remove.deleteRow(req.params.id, function () {
        res.status(200).json({
          status: 200,
          message: "Deleted line item with id: " + req.params.id,
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        message:
          "The line item " +
          req.params.id +
          " you want to delete is not found.",
      });
    }
  }),
    function (err) {
      next(err);
    };
});

//Configure router so all routes are prefixed with route
app.use("/api", router);

//Error Helpers
app.use(errorHelpers.logtoConsole);
app.use(errorHelpers.clientReqError);
app.use(errorHelpers.handleAllErrors);

//Create server to listen on port 5000
var server = app.listen(5000, function () {
  console.log("Node server is running on port 5000 on localhost");
});
