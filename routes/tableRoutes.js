const express = require("express");
const {
  handleLockRequest,
  handleUnlockRequest,
  getTableStatus,
} = require("../controllers/tableControllers");

const router = express.Router();

router.post("/lock", handleLockRequest);

router.post("/unlock", handleUnlockRequest);

router.get("/:tableId/status", getTableStatus);

module.exports = router;
