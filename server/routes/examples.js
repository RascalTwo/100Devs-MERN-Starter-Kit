const express = require("express");
const router = express.Router();
const examplesController = require("../controllers/examples");
const auth = require("../middleware/auth");
// const maxExamples = require("../middleware/maxExamples");
const validateBody = require("../middleware/validateBody");
const validateObjectId = require("../middleware/validateObjectId");
const { createExampleSchema } = require("../models/Example");

// These routes extend the /examples/ route
router.post(
  "/",
  auth.ensureAuth,
  validateBody(createExampleSchema),
  // maxExamples,
  // This calls the examples controller
  examplesController.create
);

router.get("/", examplesController.getAll);

router.get("/:id", validateObjectId, examplesController.getOne);

router.delete(
  "/:id",
  auth.ensureAuth,
  validateObjectId,
  examplesController.deleteExample
);

router.delete(
  "/deleteAllExamples/:groupId",
  auth.ensureAuth,
  examplesController.deleteAllExamples
);

module.exports = router;
